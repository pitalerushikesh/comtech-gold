import React, { useEffect } from 'react';
import {
  Collapse,
  Table,
  TableCell,
  TableBody,
  Box,
  Button,
  TableContainer,
  Chip,
  TableRow,
  TableHead,
  IconButton,
  Typography,
  Modal
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import InvestorStatus from './InvestorStatus';
// import { useHttpApi, useWeb3, useSubscriptionState } from 'state';
// import { toChecksumAddress } from 'helpers/web3';
import EmptyDashboard from 'assets/images/emptyassets.png';
import AddressFieldTools from 'components/AddressFieldTools';
import SyncIcon from '@mui/icons-material/Sync';
// import { titleCase } from 'helpers/text';
// import InvestorDocVewUploadModal from 'components/DocMangement/InvestorDocViewUploadModal';
import UploadIcon from '@mui/icons-material/Upload';
// import Synaps from '@synaps-io/react-verify';
import { useCoreTableState, useAppState } from 'state';
import TokenMintingTable from './admin/TokenMintingTable';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const { account, executorAddr, mintWalletAddr } = useAppState();

  const onlyExecutor = account === executorAddr;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" align="left" scope="row" padding="normal">
          {row.bar_number}
        </TableCell>
        <TableCell component="th" align="left" scope="row" padding="normal">
          {row.warrant_number}
        </TableCell>
        <TableCell component="th" align="left" scope="row" padding="normal">
          <Chip color="success" label="Initiated" />
        </TableCell>
        {onlyExecutor && (
          <TableCell align="center">
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      {onlyExecutor && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <TokenMintingTable
                  mintAddr={mintWalletAddr}
                  barNumber={row.bar_number}
                  warrantNumber={row.warrant_number}
                />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default function MintTokenTable() {
  // Get  Current logged in web3 account
  const { initiatedMintHistory, fetchInitiatedMintHistory } = useCoreTableState();
  // API call to get open transaction
  // const { getAllSubscriptionsByXinFinAddress } = useHttpApi();
  // const [openTransaction, setOpenTransaction] = React.useState([]);
  //   const { openTransaction, setOpenTransaction, fetchOpenTransactionData } = useSubscriptionState();
  // Load the rows from a get request
  //    const fetchData = async () => {
  //   const result = await getAllSubscriptionsByXinFinAddress(toChecksumAddress(account));
  //   setOpenTransaction(result);
  // };
  const fetchData = () => {
    fetchInitiatedMintHistory();
    console.log('fetching data');
    console.log(initiatedMintHistory);
  };
  // useEffect(() => {
  //   fetchInitiatedMintHistory();
  //   console.log('fetching data');
  //   console.log(mintHistory);
  // }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-between' }}>
        <IconButton onClick={fetchData}>
          <SyncIcon />
        </IconButton>
      </Box>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Bar Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Warrant Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {initiatedMintHistory.map((row) => (
              <Row key={row.bar_number} row={row} />
            ))}
            {initiatedMintHistory.length === 0 && (
              <TableCell
                colSpan={4}
                sx={{
                  textAlign: 'center'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    img
                    sx={{ ml: '10rem' }}
                    component="img"
                    src={EmptyDashboard}
                    alt="Empty Dashboard"
                  />
                  {/* <Typography sx={{ ml: '10rem' }} variant="p">
                    {active ? 'No open transaction found' : 'Please connect to Web3 Wallet'}
                  </Typography> */}
                </Box>
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
