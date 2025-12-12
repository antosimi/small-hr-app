import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Logo from '../../LOGO/hr_app_logopng_cropped.png'

interface HeaderProps {
  selectedMainTab: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export default function Header({ selectedMainTab, onChange }: HeaderProps) {
    const headerHeight = 70; // bara gri are inaltime fixa


    return (

        <Box
            sx={{
                bgcolor: "#8d8d8dff",
                height: headerHeight,
                display: "flex",
                alignItems: "center",
                px: 3,
                gap:8,
            }}
        >
            <Box
                sx={{
                    height: headerHeight,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 3,
                    
                }}
            >
                {/* Logo cu efect de zoom la hover */}
                <Box
                    component="img"
                    src={Logo}
                    alt="Logo"
                    sx={{
                        maxHeight: '80%',
                        width: 'auto',
                        transition: 'transform 0.3s',
                        '&:hover': {
                            transform: 'scale(1.2)'
                        },
                        cursor: 'pointer'
                    }}
                />
            </Box>

            <Tabs value={selectedMainTab} onChange={onChange} 
                sx={{
                    "& .MuiTab-root": {
                        "&.Mui-focusVisible": {
                            outline: "none",
                            boxShadow: "none",
                        },
                        "&:focus": {
                            outline: "none",
                            boxShadow: "none",
                        },
                        "&:focus-visible": {
                            outline: "none",
                            boxShadow: "none",
                        }
                    }
                }}
            >
                <Tab label="Home" />
                <Tab label="My Info" />
                <Tab label="People" />
            </Tabs>
        </Box >
    );

}
