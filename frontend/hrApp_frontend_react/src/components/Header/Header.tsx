import React, { useState } from "react";
import { Box, Tab, Tabs, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logo from '../../LOGO/hr_app_logopng_cropped.png';

interface HeaderProps {
    selectedMainTab: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
    onLogout: () => void;
}

export default function Header({ selectedMainTab, onChange, onLogout }: HeaderProps) {
    const headerHeight = 70;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const handleLogout = () => {
        handleMenuClose();
        onLogout();

    };

    return (
        <Box
            sx={{
                bgcolor: "#8d8d8dff",
                height: headerHeight,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", // Pushes content to the edges
                px: 3,
            }}
        >
            {/* Left Side: Logo and Tabs */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Box
                    sx={{
                        height: headerHeight,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
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

                <Tabs
                    value={selectedMainTab}
                    onChange={onChange}
                    sx={{
                        "& .MuiTab-root": {
                            color: "white",
                            "&.Mui-selected": { color: "#fff", fontWeight: "bold" },
                            "&:focus": { outline: "none" }
                        }
                    }}
                >
                    <Tab label="Home" />
                    <Tab label="My Info" />
                    <Tab label="People" />
                </Tabs>
            </Box>

            {/* Right Side: Profile Icon and Dropdown */}
            <Box>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleMenuClick}
                        size="large"
                        sx={{ color: "white" }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <AccountCircle fontSize="large" />
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleMenuClose}
                    onClick={handleMenuClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    PaperProps={{
                        elevation: 3,
                        sx: { mt: 1.5, minWidth: 150 }
                    }}
                >                 
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main', fontWeight: 'bold' }}>
                        LogOut
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}



