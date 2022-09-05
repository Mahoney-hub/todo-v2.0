import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color={'primary'}>
                <Toolbar sx={{justifyContent:'center'}}>

                </Toolbar>
            </AppBar>
        </Box>
    );
}