import React from 'react';

import clsx from 'clsx';
import DeleteIcon from '@mui/icons-material/Delete';
import GlobalFilter from './GlobalFilter';
import { Typography, Tooltip, IconButton, Toolbar, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import SyncIcon from '@mui/icons-material/Sync';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main
        }
      : {
          color: theme.palette.text.primary
        },
  title: {
    flex: '1 1 100%'
  }
}));

const TableToolbar = (props) => {
  const classes = useToolbarStyles();
  const navigate = useNavigate();

  const {
    numSelected,
    deleteUserHandler,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
    tableTitle,
    refreshFunction
  } = props;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <IconButton onClick={refreshFunction}>
        <SyncIcon />
      </IconButton>

      <Box sx={{ flex: '1 1 auto' }} />
      {numSelected > 0 ? (
        <Box>
          <Typography className={classes.title} color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        </Box>
      ) : (
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  tableTitle: PropTypes.string.isRequired,
  numSelected: PropTypes.number.isRequired,
  deleteUserHandler: PropTypes.func.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
  preGlobalFilteredRows: PropTypes.array.isRequired,
  globalFilter: PropTypes.string.isRequired,
  refreshFunction: PropTypes.func.isRequired
};

export default TableToolbar;
