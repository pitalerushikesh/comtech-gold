import { Typography, Divider, Box, Container } from '@mui/material';
import React from 'react';
import yodaplus from 'assets/images/yodaplus.png';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#111' }}>
      <Divider
        sx={{
          mt: 4
        }}
      />
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="body1"
            // align="center"
            sx={{
              py: 2,
              // color: '#161c2d'
              color: '#fff'
            }}
          >
            &copy; {new Date().getFullYear()}, Powered By XDC Network
          </Typography>
          <Typography
            variant="body1"
            // align="center"
            onClick={() => window.open('https://yodaplus.com', '_blank')}
            sx={{
              py: 2,
              // color: '#161c2d'
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            Developed By {'\u00A0'}
            <span>
              <Box component="img" src={yodaplus} sx={{ height: '1.8rem' }} alt="Comtech Gold" />
            </span>
            {'\u00A0'} Yodaplus
            {/* <span style={{ color: '#0D7350' }}>Yoda</span>
            <span style={{ color: '#7E7E7D' }}>plus</span> */}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
