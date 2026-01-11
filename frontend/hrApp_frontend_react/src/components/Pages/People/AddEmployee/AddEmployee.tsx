import React, { useState } from "react";
import {
    Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, MenuItem, FormControl, InputLabel, Select, FormLabel,
    OutlinedInput, Chip,
    type SelectChangeEvent,
    InputAdornment,
    IconButton
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { employeeService, type EmployeeCreationDTO, type ManagerDTO } from "../../../../services/employeeService";
import { roleService, type Role } from "../../../../services/roleService";
import dayjs, { Dayjs } from "dayjs";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function AddEmployee({ onAdd }: { onAdd: () => void }) {
    const [open, setOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Form States
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState<Dayjs | null>(null);
    const [jobTitle, setJobTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [manager, setManager] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hiringDate, setHiringDate] = useState<Dayjs | null>(null);
    const [startingDate, setStartingDate] = useState<Dayjs | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Data States
    const [managers, setManagers] = useState<ManagerDTO[]>([]);
    const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
    const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleOpen = async () => {
        setOpen(true);
        try {
            const [managersData, rolesData] = await Promise.all([
                employeeService.getAllManagers(),
                roleService.getAllRoles()
            ]);
            setManagers(managersData);
            setAvailableRoles(rolesData);
        } catch (err) {
            console.error("Failed to fetch startup data", err);
        }
    };

    const handleRoleChange = (event: SelectChangeEvent<number[]>) => {
        const value = event.target.value;
        setSelectedRoleIds(typeof value === 'string' ? value.split(',').map(Number) : value);
    };

    const handleClose = () => {
        setOpen(false);
        setFormSubmitted(false);
        // Reset states here if needed
    };

    const handleSubmit = async () => {
        setFormSubmitted(true);

        if (!firstName || !lastName || !email || !password || !birthday || !jobTitle ||
            !department || !hiringDate || !startingDate || selectedRoleIds.length === 0) {
            return;
        }

        const dto: EmployeeCreationDTO = {
            firstName,
            lastName,
            email,
            phone,
            birthday: birthday.format("YYYY-MM-DD"),
            jobTitle,
            department,
            managerId: manager,
            username,
            password,
            hiringDate: hiringDate.format("YYYY-MM-DD"),
            startingDate: startingDate.format("YYYY-MM-DD"),
            roles: selectedRoleIds
        };

        try {
            const formData = new FormData();
            formData.append("employee", new Blob([JSON.stringify(dto)], { type: "application/json" }));
            if (imageFile) formData.append("image", imageFile);

            await employeeService.add(formData);
            onAdd();
            handleClose();
        } catch (error) {
            console.error("Failed to add employee:", error);
        }
    };

    return (
        <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleOpen}>+ Add Employee</Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogContent>
                    <TextField required fullWidth label="First Name" margin="dense" value={firstName} onChange={e => setFirstName(e.target.value)} error={formSubmitted && !firstName} />
                    <TextField required fullWidth label="Last Name" margin="dense" value={lastName} onChange={e => setLastName(e.target.value)} error={formSubmitted && !lastName} />
                    <TextField required fullWidth label="Email" margin="dense" value={email} onChange={e => setEmail(e.target.value)} error={formSubmitted && !email} />


                    <FormControl fullWidth margin="dense" required error={formSubmitted && selectedRoleIds.length === 0}>
                        <InputLabel>Roles</InputLabel>
                        <Select
                            multiple
                            value={selectedRoleIds}
                            onChange={handleRoleChange}
                            input={<OutlinedInput label="Roles" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((id) => (
                                        <Chip key={id} label={availableRoles.find(r => r.id === id)?.name} />
                                    ))}
                                </Box>
                            )}
                        >
                            {availableRoles.map((role) => (
                                <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField fullWidth label="Phone" margin="dense" value={phone} onChange={e => setPhone(e.target.value)} />

                    <DatePicker label="Birthday" value={birthday} onChange={setBirthday}
                        slotProps={{ textField: { fullWidth: true, margin: "dense", required: true, error: formSubmitted && !birthday } }} />

                    <TextField required fullWidth label="Job Title" margin="dense" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                    <TextField required fullWidth label="Department" margin="dense" value={department} onChange={e => setDepartment(e.target.value)} />

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Manager</InputLabel>
                        <Select value={manager ?? ""} label="Manager" onChange={(e) => setManager(e.target.value)}>
                            <MenuItem value="">None</MenuItem>
                            {managers.map((m) => <MenuItem key={m.id} value={m.id}>{m.fullName}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <TextField required fullWidth label="Username" margin="dense" value={username} onChange={e => setUsername(e.target.value)} error={formSubmitted && !username} />

                    <TextField
                        required
                        fullWidth
                        label="Temporary Password"
                        margin="dense"
                        // Toggle type between 'password' and 'text'
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={formSubmitted && !password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />



                    <DatePicker label="Hiring Date" value={hiringDate} onChange={setHiringDate}
                        slotProps={{ textField: { fullWidth: true, margin: "dense" } }} />

                    <DatePicker label="Starting Date" value={startingDate} onChange={setStartingDate}
                        slotProps={{ textField: { fullWidth: true, margin: "dense" } }} />

                    <Box sx={{ mt: 2 }}>
                        <FormLabel>Profile Image</FormLabel>
                        <input type="file" style={{ display: 'block', marginTop: '8px' }}
                            onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Create Account</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
