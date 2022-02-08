import React from 'react';
import { AppBar, IconButton, Box, Toolbar, Typography, Menu, MenuItem, ListItemIcon, Tooltip,Zoom } from '@mui/material';
import { AccountCircleOutlined, LogoutOutlined, MoreVert } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
        setAnchorEl(null);
    };
    const matches = useMediaQuery('(max-width:500px)');
    return (<Box sx={{ flexGrow: 1, px: 2, py: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                    To-Do Application
                </Typography>
                {matches ? <span>
                    <IconButton
                        size="large"
                        onClick={handleClick}
                        color="inherit"
                    >
                        <MoreVert sx={{ color: 'white', marginX: 1 }} />
                    </IconButton>
                </span> : <span>
                    <Tooltip title="Account" TransitionComponent={Zoom}>
                    <IconButton
                        size="large"
                        onClick={null}
                        color="inherit"
                    >
                        <AccountCircleOutlined sx={{ color: 'white'}} />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Logout" TransitionComponent={Zoom}>
                    <IconButton
                        size="large"
                        onClick={null}
                        color="inherit"
                        onClick={handleLogout}>
                        <LogoutOutlined sx={{ color: 'white'}} />
                    </IconButton>
                    </Tooltip>
                </span>}
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Zoom}>
                    <MenuItem onClick={handleClose}><ListItemIcon><AccountCircleOutlined /></ListItemIcon> Account</MenuItem>
                    <MenuItem onClick={handleLogout}><ListItemIcon><LogoutOutlined /></ListItemIcon>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    </Box>
    );
}
