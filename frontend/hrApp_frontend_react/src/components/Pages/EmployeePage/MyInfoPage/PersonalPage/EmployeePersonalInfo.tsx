// EmployeePersonalInfo.tsx
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function EmployeePersonalInfo() {
  return (
    <Card sx={{ mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Personal Information
        </Typography>

        <List>
          <ListItem>
            <ListItemText primary="First Name" secondary="SIMIONESCU" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Last Name" secondary="ANTONIA SIMINA" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary="antonia.simionescu@company.com" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Phone" secondary="+40 721 555 333" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Job Title" secondary="Senior Developer" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Department" secondary="Software Engineering" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Manager" secondary="Gigel Popa" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Hiring Date" secondary="12/22/2003" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Starting Date" secondary="15/06/2025" />
          </ListItem>

        </List>
      </CardContent>
    </Card>
  );
}
