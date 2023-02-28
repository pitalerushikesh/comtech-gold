import EnhancedTable from 'components/tables/EnhancedTable';
import React, { useMemo, useEffect } from 'react';
import { Box } from '@mui/material';
import AddressFieldTools from 'components/AddressFieldTools';
import DummyData from './DummyData.json';
import { useCoreTableState } from 'state';

export default function MintHistory() {
  const { mintHistory, fetchMintHistory } = useCoreTableState();

  const updateData = () => {
    const res = fetchMintHistory();
    console.log('🚀 ~ file: HoldingsTable.js ~ line 15 ~ updateData ~ res', res);
  };

  // const data = DummyData;

  const headCells = useMemo(
    () => [
      {
        accessor: 'bar_number',
        Header: 'Bar Number',
        show: true
        // Cell: ({ row: { original } }) => {
        //   return <Box>{original.bar_details.bar_number}</Box>;
        // }
      },
      {
        accessor: 'warrant_number',
        Header: 'Warrant Number',
        show: true
        // Cell: ({ row: { original } }) => {
        //   return <Box>{original.bar_details.warrant_number}</Box>;
        // }
      },
      {
        accessor: 'mint_date',
        Header: 'Mint Date',
        show: true
        // Cell: ({ row: { original } }) => {
        //   return <Box>{original.bar_details.warrant_number}</Box>;
        // }
      }
      // {
      //   accessor: 'warrant_number',
      //   Header: 'Warrant Number',
      //   show: true
      //   // Cell: ({ row: { original } }) => {
      //   //   return <Box>{original.bar_details.warrant_number}</Box>;
      //   // }
      // }
    ],
    []
  );

  return (
    <>
      <EnhancedTable
        tableTitle="Transactions"
        columns={headCells}
        data={mintHistory}
        refreshFunction={updateData}
      />
    </>
  );
}
