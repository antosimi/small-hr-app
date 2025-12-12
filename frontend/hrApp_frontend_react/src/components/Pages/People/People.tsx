import React, { useEffect, useState } from "react";
import { Box, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, CircularProgress } from "@mui/material";
import { employeeService, type Employee } from "../../../services/employeeService";
import AddEmployee from "./AddEmployee/AddEmployee";


export default function People() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        employeeService
            .getAll()
            .then((data) => setEmployees(data))
            .catch(() => setError("Failed to fetch employees"))
            .finally(() => setLoading(false));
    }, []);


    if (loading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );

    const handleAdd = (emp: Employee) => {
        setEmployees(prev => [emp, ...prev]); // pune angajatul nou în partea de sus a tabelului
    };


    if (error)
        return (
            <Typography color="error" sx={{ mt: 3, textAlign: "center" }}>
                {error}
            </Typography>
        );


    return (
    <Box sx={{ p: 4 }}>
        <AddEmployee onAdd={handleAdd} />

        <Paper sx={{ overflow: "hidden" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} sx={{ textAlign: "center", py: 3 }}>
                                No employees to display
                            </TableCell>
                        </TableRow>
                    ) : (
                        employees.map((emp, index) => (
                            <TableRow key={index}>
                                <TableCell>{emp.firstName}</TableCell>
                                <TableCell>{emp.lastName}</TableCell>
                                <TableCell>{emp.email}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Paper>
    </Box>
);
}
