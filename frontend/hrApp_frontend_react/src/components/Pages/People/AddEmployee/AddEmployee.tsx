import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    FormLabel
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { employeeService, type Employee, type ManagerDTO } from "../../../../services/employeeService";
import dayjs, { Dayjs } from "dayjs";


export default function AddEmployee({ onAdd }: { onAdd: (employee: Employee) => void }) {
    const [open, setOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState<Dayjs | null>(null);
    const [jobTitle, setJobTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [manager, setManager] = useState<string | null>(null);
    const [hiringDate, setHiringDate] = useState<Dayjs | null>(null);
    const [startingDate, setStartingDate] = useState<Dayjs | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [managers, setManagers] = useState<ManagerDTO[]>([]);
    const [loadingManagers, setLoadingManagers] = useState(false);

    const handleOpen = async () => {
        setOpen(true);
        setLoadingManagers(true);
        try {
            const managersFromBackend = await employeeService.getAllManagers();
            setManagers(managersFromBackend);
        } catch (err) {
            console.error("Failed to fetch managers", err);
            setManagers([]);
        } finally {
            setLoadingManagers(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setFormSubmitted(false);
    };

    const handleSubmit = async () => {
        setFormSubmitted(true);

        if (!firstName || !lastName || !email || !phone || !birthday || !jobTitle ||
            !department  || !hiringDate || !startingDate) {
            return;
        }

        const newEmployee: Employee = {
            firstName,
            lastName,
            email,
            phone,
            birthday: birthday.format("YYYY-MM-DD"),
            jobTitle,
            department,
            manager: manager, // ID numeric
            hiringDate: hiringDate.format("YYYY-MM-DD"),
            startingDate: startingDate.format("YYYY-MM-DD"),
            image: null,
        };

        try {
            const formData = new FormData();
            formData.append(
                "employee",
                new Blob([JSON.stringify(newEmployee)], { type: "application/json" })
            );
            if (imageFile) formData.append("image", imageFile);

            const createdEmployee = await employeeService.add(formData);
            onAdd(createdEmployee);

            handleClose();

            // resetare form
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setBirthday(null);
            setJobTitle("");
            setDepartment("");
            setManager("");
            setHiringDate(null);
            setStartingDate(null);
            setImageFile(null);

        } catch (error) {
            console.error("Failed to add employee:", error);
        }
    };

    return (
        <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                + Add Employee
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogContent>

                    <TextField required fullWidth label="First Name" margin="normal" value={firstName} onChange={e => setFirstName(e.target.value)} error={formSubmitted && !firstName} />
                    <TextField required fullWidth label="Last Name" margin="normal" value={lastName} onChange={e => setLastName(e.target.value)} error={formSubmitted && !lastName} />
                    <TextField required fullWidth label="Email" margin="normal" value={email} onChange={e => setEmail(e.target.value)} error={formSubmitted && !email} />
                    <TextField required fullWidth label="Phone" margin="normal" value={phone} onChange={e => setPhone(e.target.value)} error={formSubmitted && !phone} />

                    <DatePicker
                        label="Birthday"
                        value={birthday}
                        onChange={setBirthday}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                margin: "normal",
                                required: true,
                                error: formSubmitted && !birthday,
                                helperText: formSubmitted && !birthday ? "Birthday is required" : ""
                            }
                        }}
                    />

                    <TextField required fullWidth label="Job Title" margin="normal" value={jobTitle} onChange={e => setJobTitle(e.target.value)} error={formSubmitted && !jobTitle} />
                    <TextField required fullWidth label="Department " margin="normal" value={department} onChange={e => setDepartment(e.target.value)} error={formSubmitted && !department} />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Manager</InputLabel>
                        <Select
                            value={manager ?? ""}
                            label="Manager"
                            onChange={(e) => setManager(e.target.value)}
                        >
                            {managers.length === 0 ? (
                                <MenuItem disabled>No managers available</MenuItem>
                            ) : (
                                managers.map((manager) => (
                                    <MenuItem key={manager.id} value={manager.id}>
                                        {manager.fullName}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>


                    <DatePicker
                        label="Hiring Date"
                        value={hiringDate}
                        onChange={setHiringDate}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                margin: "normal",
                                required: true,
                                error: formSubmitted && !hiringDate,
                                helperText: formSubmitted && !hiringDate ? "Hiring Date is required" : ""
                            }
                        }}
                    />

                    <DatePicker
                        label="Starting Date"
                        value={startingDate}
                        onChange={setStartingDate}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                margin: "normal",
                                required: true,
                                error: formSubmitted && !startingDate,
                                helperText: formSubmitted && !startingDate ? "Starting Date is required" : ""
                            }
                        }}
                    />


                    <Box sx={{ mb: 2, mt: 3 }}>
                        <FormLabel component="legend" sx={{ mb: 1 }}>
                            Employee Image
                        </FormLabel>
                        <TextField
                            fullWidth
                            type="file"
                            onChange={(e) => {
                                const target = e.target as HTMLInputElement;
                                if (target.files && target.files[0]) setImageFile(target.files[0]);
                            }}
                        />
                    </Box>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}