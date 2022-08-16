import React from "react";
import Page from "../components/page";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  Input
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Home = () => {
  return (
    <Page title="XDC Liquidity Portal | TradeFineX">
      <Container>
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          Comtech Gold
        </Typography>
        <Accordion 
        defaultExpanded
        sx={{
          boxShadow:"none",
          border:'1px solid #D2D2D2',
          borderRadius:'6px',
          px:4,
          py:1,
          mt:'29px'
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
        Smart Contracts
        </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <TableContainer>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Contract Name</TableCell>
                  <TableCell>Contract Address</TableCell>
                  <TableCell
                  sx={{textAlign:'center'}}
                  >
                  View On Block Scan
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{fontWeight:'bold'}}>Comtech Gold Tokens</TableCell>
                  <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      m: 0,
                      p: 0,
                      alignItems: 'center'
                    }}
                  >
                    <Box
                    sx={{
                      textOverflow:"ellipsis",
                      whiteSpace:'nowrap',
                      overflow:"hidden"
                    }}
                    >
                    smart contract address
                    </Box>

                    <IconButton
                    aria-label = "subs detail"
                    
                    >
                    <ContentCopyIcon sx={{fontSize:"1rem"}}/>
                    </IconButton>
                  </Box>
                  </TableCell>
                  <TableCell
                  sx={{
                    display:'flex',
                    justifyContent:'center'
                  }}
                  >
                  <Box
                  sx={{
                    textOverflow:"ellipsis",
                    whiteSpace:'nowrap',
                    overflow:"hidden"}}
                  >
                  Address field tool icon
                  </Box>
                  
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
        </Accordion>


        <Accordion 
        defaultExpanded
        sx={{
          boxShadow:"none",
          border:'1px solid #D2D2D2',
          borderRadius:'6px',
          px:4,
          py:1,
          mt:'29px'
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
          Token Minting
        </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

        <div>
        <FormControl sx={{ m: 1 }} variant="standard">
        <Typography
        sx={{

          px:1,
          fontSize:15
        }}
        >
        Mint to
        </Typography>
        </FormControl>
        <FormControl 
        sx={{ mx: 2 ,
          width: '25ch'
          
        }} variant="standard">
          <InputLabel htmlFor="standard-adornment-address">Address</InputLabel>
          <Input
            id="standard-adornment-address"
          startAdornment={<InputAdornment position="start"
     
          ></InputAdornment>}
          />
        </FormControl>

        <FormControl sx={{ mx:2  ,width: '25ch'}} variant="standard">
          <InputLabel htmlFor="standard-adornment-quantity">Quantity</InputLabel>
          <Input
            id="standard-adornment-quantity"
          startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl>
        <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{px:4,
                mx:4      
            }}
          >
            Mint
          </Button>
        </div>
        </Box>
        </AccordionDetails>
          
        </Accordion>

        <Accordion 
        defaultExpanded
        sx={{
          boxShadow:"none",
          border:'1px solid #D2D2D2',
          borderRadius:'6px',
          px:4,
          py:1,
          mt:'29px'
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
        Blacklist Admin
        </Typography>
        </AccordionSummary>

        
        <AccordionDetails>
       
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

        <div>
        
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-address">Address</InputLabel>
          <Input
            id="standard-adornment-address"
          startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl>

        <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{px:2,mx:2}}
          >
            Blacklist
          </Button>
        </div>
        </Box>
        </AccordionDetails>
        </Accordion>



      </Container>
    </Page>
  );
};

export default Home;
