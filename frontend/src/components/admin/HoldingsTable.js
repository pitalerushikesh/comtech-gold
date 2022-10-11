import EnhancedTable from 'components/tables/EnhancedTable';
import React, { useMemo, useEffect } from 'react';
import { Box } from '@mui/material';
import AddressFieldTools from 'components/AddressFieldTools';
import DummyData from './DummyData.json';

export default function HoldingsTable() {
  const updateData = () => {
    const data = DummyData;
    return data;
  };

  const data = DummyData;

  const headCells = useMemo(
    () => [
      {
        accessor: 'method',
        Header: 'Method',
        show: true,
        width: 100
      },
      {
        accessor: 'id',
        Header: 'Transaction ID',
        show: true,
        Cell: ({ value }) => {
          return <Box>{value}</Box>;
        }
      },

      {
        accessor: 'name',
        Header: 'Name',
        show: true,
        Cell: ({ value }) => {
          return <Box>{value}</Box>;
        }
      }
    ],
    []
  );

  return (
    <>
      <EnhancedTable
        tableTitle="Transactions"
        columns={headCells}
        data={data}
        refreshFunction={updateData}
      />
    </>
  );
}
