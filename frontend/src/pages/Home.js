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
  Box,
  Card
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionLayout from '../helpers/AccordionLayout';
// import TokenMintingTable from '../components/admin/TokenMintingTable';
import BlacklistAdminTable from '../components/admin/BlacklistAdminTable';
import { currentNetwork, ethToXdcAddress } from 'helpers/web3';
import AddressFieldTools from 'components/AddressFieldTools';
import BurnToken from 'components/admin/BurnToken';
import HoldingsTable from 'components/admin/HoldingsTable';
import BurnHistoryTable from 'components/admin/BurnHistoryTable';
import AddExistingBar from 'components/admin/AddExistingBar';
import CheckEditBarPause from 'components/admin/CheckEditBarPause';
import RemoveExistingBar from 'components/admin/RemoveExistingBar';
import { useCoreTableState } from 'state';
import InitiateMint from 'components/admin/InitiateMint';
import MintTokenTable from 'components/MintTokenTable';
import InitiateBurn from 'components/admin/InitiateBurn';
import BurnTokenTable from 'components/BurnTokenTable';
import InitiatorExecutor from 'components/admin/InitiatorExecutor';

const Home = () => {
  const { editBarStatus } = useCoreTableState();

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
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Comtech Controller Contract</TableCell>
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
                          {ethToXdcAddress(currentNetwork.controllerContractAddress)}
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
                        address={currentNetwork.controllerContractAddress}
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
        <AccordionLayout
          defaultExpanded
          title="Configure Initiator & Executor"
          content={<InitiatorExecutor />}
        />

        <AccordionLayout defaultExpanded title="Initiate Mint" content={<InitiateMint />} />
        <AccordionLayout defaultExpanded title="Mint Token" content={<MintTokenTable />} />

        {/* <AccordionLayout defaultExpanded title="Mint Token" content={<TokenMintingTable />} /> */}
        <AccordionLayout title="Initiate Burn" content={<InitiateBurn />} />
        <AccordionLayout title="Burn Token" content={<BurnTokenTable />} />
        <AccordionLayout title="Blacklist Admin" content={<BlacklistAdminTable />} />

        {/* ***START*** Remove the Following ui in production */}

        {editBarStatus && (
          <>
            <AccordionLayout title="Edit Bar Status" content={<CheckEditBarPause />} />
            <AccordionLayout title="Manual Bar Entry" content={<AddExistingBar />} />
            <AccordionLayout title="Manual Bar Deletion" content={<RemoveExistingBar />} />
          </>
        )}

        {/* ***END*** Remove the Following ui in production */}

        {/* <AccordionLayout title="Burn History" content={<BurnHistoryTable />} />
        <AccordionLayout title="Holdings" content={<HoldingsTable />} /> */}
      </Container>
    </Page>
  );
};

export default Home;
