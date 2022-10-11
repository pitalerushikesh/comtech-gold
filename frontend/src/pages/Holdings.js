import React from 'react';
import Page from '../components/page';
import { Container, Typography } from '@mui/material';
import AccordionLayout from '../helpers/AccordionLayout';
import HoldingsTable from 'components/admin/HoldingsTable';
import BurnHistoryTable from 'components/admin/BurnHistoryTable';

const Holdings = () => {
  return (
    <Page title="Holdings | Comtech Gold">
      <Container>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
          Holdings
        </Typography>
        <AccordionLayout title="Burn History" defaultExpanded content={<BurnHistoryTable />} />
        <AccordionLayout title="Holdings" content={<HoldingsTable />} />
      </Container>
    </Page>
  );
};

export default Holdings;
