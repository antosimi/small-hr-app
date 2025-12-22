import React, { useEffect, useState } from "react";
import {
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Typography,
    CircularProgress,
    Checkbox,
    TablePagination
} from "@mui/material";
import { employeeService, type Employee } from "../../../services/employeeService";
import AddEmployee from "./AddEmployee/AddEmployee";
import DeleteEmployees from "./DeleteEmployees/DeleteEmployees";
import { Snackbar, Alert } from "@mui/material";

export default function People() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);

    const showSnackbar = (message: string, severity: "success" | "error" = "success") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await employeeService.getAll(page, rowsPerPage);
            setEmployees(response.items);
            setTotal(response.total);
            setSelectedIds([]);
        } catch {
            setError("Failed to fetch employees");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [page, rowsPerPage]);

    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? employees.map(e => e.id) : []);
    };

    const handleSelectOne = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    const handleAddEmployee = async () => {
        fetchEmployees();
        showSnackbar("Employee added", "success");
    };


    const handleDeleteEmployees = async () => {
        try {
            await employeeService.deleteEmployees(selectedIds);
            showSnackbar("Employees deleted", "success");
            fetchEmployees();
        } catch {
            showSnackbar("Delete failed", "error");
        }
    };

    if (loading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );

    if (error)
        return (
            <Typography color="error" sx={{ mt: 3, textAlign: "center" }}>
                {error}
            </Typography>
        );

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            
                    <AddEmployee onAdd={handleAddEmployee} />
              

                <Box sx={{ width: 150 }}>
                    <DeleteEmployees
                        disabled={selectedIds.length === 0}
                        onDeleted={handleDeleteEmployees}
                        selectedIds={selectedIds}
                    />
                </Box>


            </Box>

            <Paper sx={{ overflow: "hidden" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={
                                        employees.length > 0 &&
                                        selectedIds.length === employees.length
                                    }
                                    indeterminate={
                                        selectedIds.length > 0 &&
                                        selectedIds.length < employees.length
                                    }
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                />
                            </TableCell>
                            <TableCell><b>First Name</b></TableCell>
                            <TableCell><b>Last Name</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {employees.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No employees
                                </TableCell>
                            </TableRow>
                        ) : (
                            employees.map(emp => (
                                <TableRow key={emp.id} hover>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedIds.includes(emp.id)}
                                            onChange={() => handleSelectOne(emp.id)}
                                        />
                                    </TableCell>
                                    <TableCell>{emp.firstName}</TableCell>
                                    <TableCell>{emp.lastName}</TableCell>
                                    <TableCell>{emp.email}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                <TablePagination
                    component="div"
                    count={total}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Paper>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}


