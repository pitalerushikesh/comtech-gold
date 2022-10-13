import EnhancedTable from 'components/tables/EnhancedTable';
import React, { useMemo, useEffect } from 'react';
import { Box } from '@mui/material';
import DummyData from './DummyData.json';
import { useCoreTableState } from 'state';

export default function BurnHistoryTable() {
  const { burnHistory, fetchBurnHistory } = useCoreTableState();

  const updateData = () => {
    const res = fetchBurnHistory();
    console.log('🚀 ~ file: BurnHistoryTable.js ~ line 13 ~ updateData ~ res', res);
  };

  const data = DummyData;

  const headCells = useMemo(
    () => [
      {
        accessor: 'burnt_bar',
        Header: 'Burnt Bar',
        show: true,
        width: 100,
        Cell: ({ row: { original } }) => {
          return <Box>{original.burnt_bar.bar_number}</Box>;
        }
      },
      {
        accessor: 'adjusted_bar',
        Header: 'Adjusted Bar',
        show: true,
        Cell: ({ row: { original } }) => {
          return <Box>{original.adjusted_bar.bar_number}</Box>;
        }
      },
      {
        accessor: 'adjusted_amount',
        Header: 'Amount',
        show: true
      },
      {
        accessor: 'burnt_date',
        Header: 'Burnt Date',
        show: true
      },
      {
        accessor: 'tx_hash',
        Header: 'Txn. hash',
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
        data={burnHistory}
        refreshFunction={updateData}
      />
    </>
  );
}
