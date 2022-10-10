import React from 'react';

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
  Divider,
  TablePagination
} from '@mui/material';
import TablePaginationActions from './TablePaginationActions';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import PropTypes from 'prop-types';
import TableToolbar from './TableToolbar';
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  useFlexLayout,
  useResizeColumns
} from 'react-table';
import DataNotAvailable from 'helpers/DataNotAvailable';

const EnhancedTable = ({
  sx,
  columns,
  data,
  updateMyData,
  skipPageReset,
  tableTitle,
  refreshFunction
}) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter }
  } = useTable(
    {
      columns,
      data,

      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
      initialState: {
        hiddenColumns: columns.filter((column) => !column.show).map((column) => column.accessor)
      }
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useResizeColumns,
    useRowSelect,
    useFlexLayout
  );

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  // Render the UI for your table
  return (
    <Box>
      <TableToolbar
        refreshFunction={refreshFunction}
        tableTitle={tableTitle}
        numSelected={Object.keys(selectedRowIds).length}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <TableContainer>
        <Table size="small" className="table" {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, index) => (
              <TableRow sx={{ m: 0, p: 0 }} key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    sx={{
                      color: '#8e8ea7'
                    }}
                    padding="normal"
                    key={column.id}
                    align={column.align}
                    {...column.getHeaderProps()}
                  >
                    <Box
                      {...column.getSortByToggleProps()}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        mr: 1
                      }}
                    >
                      {column.render('Header')}
                      {column.id !== 'selection' ? (
                        <TableSortLabel
                          active={column.isSorted}
                          // react-table has a unsorted state which is not treated here
                          direction={column.isSortedDesc ? 'desc' : 'asc'}
                        />
                      ) : null}
                    </Box>

                    <Box
                      sx={{
                        display: 'inline-block',
                        width: '1.25rem', // 20px
                        height: '100%',
                        position: 'absolute',
                        right: '0',
                        top: '0',
                        transition: 'translateX(50%)',
                        zIndex: '1'
                      }}
                      {...column.getResizerProps()}
                      className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                    >
                      <OpenInFullIcon
                        sx={{ fontSize: '0.875rem', mt: 1.5, transform: 'rotate(45deg)' }}
                      />
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {page.length !== 0 ? (
              page.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow key={i} {...row.getRowProps()} sx={sx}>
                    {row.cells.map((cell, key) => {
                      return (
                        <TableCell
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            my: -0.3,
                            mb: 0
                          }}
                          padding="normal"
                          size="small"
                          key={key}
                          {...cell.getCellProps()}
                        >
                          <Box
                            sx={{
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden'
                            }}
                          >
                            {cell.render('Cell')}
                          </Box>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <Box>
                <DataNotAvailable sx={{ height: '10rem', mt: 2 }} />
                <Divider sx={{ mt: 2 }} />
              </Box>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length }]}
                count={data.length}
                rowsPerPage={Number(pageSize)}
                page={pageIndex}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' }
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

EnhancedTable.propTypes = {
  tableTitle: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  updateMyData: PropTypes.func.isRequired,
  skipPageReset: PropTypes.bool.isRequired,
  refreshFunction: PropTypes.func.isRequired
};

export default EnhancedTable;
