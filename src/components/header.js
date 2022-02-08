import React from 'react';
import { AppBar, IconButton, Box, Toolbar, Typography, Tooltip, Zoom } from '@mui/material';
import { LogoutOutlined} from '@mui/icons-material';

export default function Header() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };
    return (<Box sx={{ flexGrow: 1, px: 2, py: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                    To-Do Application
                </Typography>
                <Tooltip title="Logout" TransitionComponent={Zoom}>
                    <IconButton
                        size="large"
                        onClick={null}
                        color="inherit"
                        onClick={handleLogout}>
                        <LogoutOutlined sx={{ color: 'white' }} />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    </Box>
    );
}
