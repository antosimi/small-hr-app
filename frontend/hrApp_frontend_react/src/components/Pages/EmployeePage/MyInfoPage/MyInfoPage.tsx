import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";

interface MyInfoPageProps {
  selectedTab: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  imageSrc?: string;
}

const tabLabels = ["Personal", "Time Off", "Performance"];

export default function MyInfoPage({ selectedTab, handleChange, imageSrc }: MyInfoPageProps) {
  return (
    <Box
      sx={{
        bgcolor: "#7a81e6ff",
        p: 4,
        width: "100%",
        display: "flex",
        gap: 4,
        alignItems: "stretch"
      }}
    >
      {/* STANGA — imaginea */}
      {imageSrc && (
        <Box
          sx={{
            width: 160,
            height: 160,
            bgcolor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 3,
            flexShrink: 0
          }}
        >
          <img
            src={imageSrc}
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      )}

      {/* DREAPTA — numele + tab-urile */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        {/* NUMELE — partea de sus */}
        <Typography
          component="h1"
          sx={{ fontSize: "2.5rem", fontWeight: "bold", lineHeight: 1 }}
        >
          SIMIONESCU ANTONIA SIMINA
        </Typography>

        <Typography
          component="h5"
          sx={{ fontSize: "1.2rem", fontWeight: "500", lineHeight: 1, mt: -5 }}
        >
          Senior Developer
        </Typography>

        {/* Tab-urile — partea de jos */}
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{
            "& .MuiTab-root": {
              "&.Mui-focusVisible": { outline: "none", boxShadow: "none" },
              "&:focus": { outline: "none", boxShadow: "none" },
              "&:focus-visible": { outline: "none", boxShadow: "none" }
            }
          }}
        >
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
