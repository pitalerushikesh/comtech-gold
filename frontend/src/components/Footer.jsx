import { Typography, Divider, Box } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#111' }}>
      <Divider
        sx={{
          mt: 4
        }}
      />
      <Typography
        variant="body1"
        align="center"
        sx={{
          py: 2,
          // color: '#161c2d'
          color: '#fff'
        }}
      >
        &copy; {new Date().getFullYear()}, Powered By XDC Network
      </Typography>
    </Box>
  );
};

export default Footer;
