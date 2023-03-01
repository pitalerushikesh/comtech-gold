import EnhancedTable from 'components/tables/EnhancedTable';
import React, { useMemo } from 'react';
import { useCoreTableState } from 'state';

export default function HoldingsTable() {
  const { barHolders, fetchBarHolders } = useCoreTableState();

  const updateData = () => {
    const res = fetchBarHolders();
  };

  const headCells = useMemo(
    () => [
      {
        accessor: 'xdc_holder_address',
        Header: 'Holder Address',
        show: true,
        width: 300
      },
      {
        accessor: 'holder_xinfin_address',
        Header: 'Holder Address',
        show: false,
        width: 100
      },

      {
        accessor: 'bar_number',
        Header: 'Bar Number',
        show: true
      },
      {
        accessor: 'warrant_number',
        Header: 'Warrant Number',
        show: true
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
