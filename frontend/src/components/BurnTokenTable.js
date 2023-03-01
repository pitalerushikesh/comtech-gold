import React, { useEffect } from 'react';
import {
  Collapse,
  Table,
  TableCell,
  TableBody,
  Box,
  TableContainer,
  Chip,
  TableRow,
  TableHead,
  IconButton
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EmptyDashboard from 'assets/images/emptyassets.png';
import SyncIcon from '@mui/icons-material/Sync';
import { useAppState, useCoreTableState } from 'state';
import BurnToken from './admin/BurnToken';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const { account, executorAddr } = useAppState();
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
                <BurnToken barNumber={row.bar_number} warrantNumber={row.warrant_number} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default function BurnTokenTable() {
  const { initiatedBurn, fetchInitiatedBurn } = useCoreTableState();

  const fetchData = () => {
    fetchInitiatedBurn();
  };

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
            {initiatedBurn.map((row) => (
              <Row key={row.bar_number} row={row} />
            ))}
            {initiatedBurn.length === 0 && (
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
                </Box>
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
