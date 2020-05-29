import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import acnh_master_list from '../data/1eyQtn5bBy14udf8Ntn_OLkmqKRJmuGKLMXrEHY9nNKE';

const columns = [
  { 
    id: 'name', 
    label: 'Name',
    align: 'left',
  },
  { 
    id: 'price', 
    label: 'Price', 
    align: 'left',
  },
  {
    id: 'rarity',
    label: 'Rarity',
    align: 'center',
  },
];

const getMasterListShells = () => {
  const shells = acnh_master_list["Shells"];
  const rows = shells.map(s => {
    return {
      name: s["Shell"],
      price: s["Selling Price"],
      rarity: s["Rarity"]
    };
  });
  return rows;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  columnHeader: {
    cursor: 'pointer'
  }
});

export default function LeafShopShellSection({ rows=getMasterListShells() }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [selectedColumnHeader, setSelectedColumnHeader] = React.useState('Name');
  const [shouldReverseSort, setShouldReverseSort] = React.useState(false);
  const [sortedRows, setSortedRows] = React.useState(rows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleColumnHeaderClick = (columnLabel) => {
    let sorted = rows.sort((r1, r2) => {
      if (columnLabel === 'Name') {
        return r1.name.toLowerCase().localeCompare(r2.name.toLowerCase());
      } else if (columnLabel === 'Price') {
        const firstPrice = parseInt(r1.price.split(" ")[0].replace(",", ""), 10);
        const secondPrice = parseInt(r2.price.split(" ")[0].replace(",", ""), 10);
        return  secondPrice - firstPrice; 
      } else if (columnLabel === 'Rarity') {
        return r2.rarity.length - r1.rarity.length;
      } else {
        return r1-r2;
      }
    });


    if (selectedColumnHeader === columnLabel) {
      if (shouldReverseSort) {
        setShouldReverseSort(false);
      } else {
        setShouldReverseSort(true);
        sorted = sorted.reverse();
      }
    } else if (shouldReverseSort === true) { // disable reverse sort if we're changing section
      setShouldReverseSort(false);
    }

    setSortedRows(sorted);
    setSelectedColumnHeader(columnLabel);
  }
 
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={ classes.columnHeader }
                  onClick={() => handleColumnHeaderClick(column.label) }
                >
                  {column.label === selectedColumnHeader ? (
                    <span>{column.label} {shouldReverseSort === true ? '▲' : '▼'}</span>
                  ) : column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
  );
}
