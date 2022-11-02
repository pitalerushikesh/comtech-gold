import EnhancedTable from 'components/tables/EnhancedTable';
import React, { useMemo, useEffect } from 'react';
import { Box } from '@mui/material';
import AddressFieldTools from 'components/AddressFieldTools';
import DummyData from './DummyData.json';
import { useCoreTableState } from 'state';

export default function HoldingsTable() {
  const { barHolders, fetchBarHolders } = useCoreTableState();

  const updateData = () => {
    const res = fetchBarHolders();
    console.log('🚀 ~ file: HoldingsTable.js ~ line 15 ~ updateData ~ res', res);
  };

  // const data = DummyData;

  const headCells = useMemo(
    () => [
      {
        accessor: 'holder_xinfin_address',
        Header: 'Holder Address',
        show: true,
        width: 100
      },

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
        accessor: 'token_balance_formatted',
        Header: 'Token Balance',
        show: true
      }
    ],
    []
  );

  return (
    <>
      <EnhancedTable
        tableTitle="Transactions"
        columns={headCells}
        data={barHolders}
        refreshFunction={updateData}
      />
    </>
  );
}
