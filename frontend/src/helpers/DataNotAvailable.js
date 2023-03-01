import React from 'react';
import EmptyDashboard from 'assets/images/emptyassets.png';
import { Box, Typography } from '@mui/material';

const DataNotAvailable = ({ sx }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box component="img" {...sx} src={EmptyDashboard} alt="Empty Dashboard" />
        <Typography variant="p" sx={{ fontWeight: '600' }}>
          No records found
        </Typography>
      </Box>
    </>
  );
};

export default DataNotAvailable;
