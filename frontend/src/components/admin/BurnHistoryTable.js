import EnhancedTable from 'components/tables/EnhancedTable';
import React, { useMemo } from 'react';
import DummyData from './DummyData.json';
import { useCoreTableState } from 'state';

export default function BurnHistoryTable() {
  const { burnHistory, fetchBurnHistory } = useCoreTableState();

  const updateData = () => {
    const res = fetchBurnHistory();
  };

  const data = DummyData;

  const headCells = useMemo(
    () => [
      {
        accessor: 'burnt_bar_number',
        Header: 'Bar Number',
        show: true,
        width: 100
      },
      {
        accessor: 'adjusted_bar_number',
        Header: 'Adjusted Bar',
        show: true
      },
      {
        accessor: 'adjusted_amount_formatted',
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
