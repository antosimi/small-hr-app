import { Card, CardContent, Typography, List, ListItem, ListItemText, Grid } from "@mui/material";
import dayjs from "dayjs";
import type { Employee, MyProfileDTO } from "../../../../../services/employeeService";

interface InfoProps {
  employee: MyProfileDTO | null;
}

export default function EmployeePersonalInfo({ employee }: InfoProps) {
  if (!employee) return <Typography>Loading personal information...</Typography>;

  const formatDate = (date: string) => date ? dayjs(date).format("DD/MM/YYYY") : "---";

  const infoItems = [
    { label: "First Name", value: employee.firstName },
    { label: "Last Name", value: employee.lastName },
    { label: "Email", value: employee.email },
    { label: "Phone", value: employee.phone },
    { label: "Job Title", value: employee.jobTitle },
    { label: "Department", value: employee.department },
    { label: "Manager", value: employee.managerName || "N/A" },
    { label: "Hiring Date", value: formatDate(employee.hiringDate) },
    { label: "Starting Date", value: formatDate(employee.startingDate) },
  ];

  return (
    <Card sx={{ mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Personal Information
        </Typography>
        <Grid container spacing={2}>
          {infoItems.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.label}>
              <ListItem disableGutters>
                <ListItemText
                  primary={<Typography variant="caption" color="text.secondary">{item.label}</Typography>}
                  secondary={<Typography variant="body1" fontWeight="500">{item.value}</Typography>}
                />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

