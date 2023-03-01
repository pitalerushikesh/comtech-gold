import EnhancedTable from 'components/tables/EnhancedTable';
import React, { useMemo } from 'react';
import { useCoreTableState } from 'state';

export default function MintHistory() {
  const { mintHistory, fetchMintHistory } = useCoreTableState();

  const updateData = () => {
    const res = fetchMintHistory();
  };

  const headCells = useMemo(
    () => [
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
        accessor: 'mint_date',
        Header: 'Mint Date',
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
        data={mintHistory}
        refreshFunction={updateData}
      />
    </>
  );
}
