import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, Typography, CircularProgress } from "@mui/material";
import type { MyProfileDTO } from "../../../../services/employeeService";

interface MyInfoPageProps {
  selectedTab: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  employee: MyProfileDTO | null;
}

const tabLabels = ["Personal", "Performance"];

export default function MyInfoPage({ selectedTab, handleChange, employee }: MyInfoPageProps) {
  
  const fullName = employee ? `${employee.firstName} ${employee.lastName}`.toUpperCase() : "NOT FOUND";
  const jobTitle = employee?.jobTitle || "---";
  const imageSrc = employee?.image || null;

  return (
    <Box sx={{ bgcolor: "#7a81e6ff", p: 4, width: "100%", display: "flex", gap: 4, alignItems: "stretch", borderRadius: 2 }}>
      <Box sx={{
          width: 160, height: 160, bgcolor: "#fff", display: "flex", alignItems: "center",
          justifyContent: "center", borderRadius: 2, overflow: "hidden", boxShadow: 3, flexShrink: 0
        }}>
        {imageSrc ? (
          <img src={imageSrc} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <Typography color="text.disabled" variant="caption">No Image</Typography>
        )}
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", color: "white" }}>
        <Typography component="h1" sx={{ fontSize: "2.5rem", fontWeight: "bold", lineHeight: 1 }}>
          {fullName}
        </Typography>

        <Typography component="h5" sx={{ fontSize: "1.2rem", fontWeight: "500", lineHeight: 1, mt: 1 }}>
          {jobTitle}
        </Typography>

        <Tabs 
          value={selectedTab} 
          onChange={handleChange} 
          textColor="inherit" 
          indicatorColor="secondary"
          sx={{ "& .MuiTabs-indicator": { backgroundColor: "white" } }}
        >
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label} sx={{ color: 'rgba(255,255,255,0.7)', '&.Mui-selected': { color: 'white' } }} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}


