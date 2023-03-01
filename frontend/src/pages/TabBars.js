import { Container, Card, Box, Tab, Alert, IconButton, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useEffect } from 'react';
import Page from '../components/page';
import Home from './Home';
import Holdings from './Holdings';

const TabBars = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Home">
      <Container sx={{ my: 2 }}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box>
              <TabList onChange={handleChange} aria-label="read-unread-tabs">
                <Tab label="Dashboard" value="1" sx={{ fontWeight: 600, fontSize: '1rem' }} />
                <Tab label="Holdings" value="2" sx={{ fontWeight: 600, fontSize: '1rem' }} />
              </TabList>
            </Box>
            <TabPanel value="2" sx={{ p: 0, py: 2 }}>
              <Holdings />
            </TabPanel>
            <TabPanel value="1" sx={{ p: 0, py: 2 }}>
              <Home />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Page>
  );
};

export default TabBars;
