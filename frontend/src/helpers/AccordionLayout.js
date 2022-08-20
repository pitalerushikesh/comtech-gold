import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AccordionLayout = ({ title, content, defaultExpanded }) => {
  return (
    <>
      <Accordion
        sx={{
          boxShadow: 'none',
          border: '1px solid #D2D2D2',
          borderRadius: '6px',
          px: 4,
          py: 1,
          mt: '29px'
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            sx={{
              fontSize: '1.125rem',
              fontWeight: 'bold'
            }}
          >
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{content}</AccordionDetails>
      </Accordion>
    </>
  );
};

export default AccordionLayout;
