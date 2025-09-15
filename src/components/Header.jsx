// components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const Header = () => {
  return (
    <AppBar position="static" elevation={1} sx={{ bgcolor: 'white', color: 'primary.main' }}>
      <Toolbar>
        <DirectionsCarIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          ELD Trip Planner
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            DOT Compliant Route Planning
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;