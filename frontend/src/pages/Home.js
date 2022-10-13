import React, { useEffect, useState } from 'react';
import Page from '../components/page';
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
  Box
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionLayout from '../helpers/AccordionLayout';
import TokenMintingTable from '../components/admin/TokenMintingTable';
import BlacklistAdminTable from '../components/admin/BlacklistAdminTable';
import { currentNetwork, ethToXdcAddress } from 'helpers/web3';
import AddressFieldTools from 'components/AddressFieldTools';
import BurnToken from 'components/admin/BurnToken';
import HoldingsTable from 'components/admin/HoldingsTable';
import BurnHistoryTable from 'components/admin/BurnHistoryTable';

const Home = () => {
  return (
    <Page title="Admin Dashboard | Comtech Gold">
      <Container>
        {/* <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
          Dashboard
        </Typography> */}
        <Accordion
          defaultExpanded
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
                      sx={{
                        textAlign: 'center'
                      }}
                    >
                      View On Blocks Scan
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Comtech Gold Token</TableCell>
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
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden'
                          }}
                        >
                          {ethToXdcAddress(currentNetwork.tokenContractAddress)}
                        </Box>
                        {/* <IconButton
                          aria-label="subs detail"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              ethToXdcAddress(currentNetwork.tokenContractAddress)
                            )
                          }
                        >
                          <ContentCopyIcon sx={{ fontSize: '1rem' }} />
                        </IconButton> */}
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      <AddressFieldTools
                        address={currentNetwork.tokenContractAddress}
                        showInBlockExplorer
                        showAddress={false}
                      />
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Escrow & Settlement
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          m: 0,
                          p: 0,
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          sfg
                        </Box>
                        <IconButton
                          aria-label="subs detail"
                          onClick={console.log("click")}
                        >
                          <ContentCopyIcon sx={{ fontSize: "1rem" }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      AddressFieldTools
                      <AddressFieldTools
                        address={currentNetwork.escrowManagerAddress}
                        showInBlockExplorer
                        showAddress={false}
                      />
                    </TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>

        <AccordionLayout defaultExpanded title="Mint Token" content={<TokenMintingTable />} />
        <AccordionLayout title="Burn Token" content={<BurnToken />} />
        <AccordionLayout title="Blacklist Admin" content={<BlacklistAdminTable />} />
        <AccordionLayout title="Burn History" content={<BurnHistoryTable />} />
        <AccordionLayout title="Holdings" content={<HoldingsTable />} />
      </Container>
    </Page>
  );
};

export default Home;
