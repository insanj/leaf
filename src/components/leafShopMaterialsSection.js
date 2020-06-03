import React, {useEffect} from 'react';
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
    id: 'location',
    label: 'Location',
    align: 'center',
  },
];

const getMasterListMaterials = () => {
  const materials = acnh_master_list["Materials"];
  const rows = materials.map(s => {
    return {
      name: s["Material"],
      price: s["Price"],
      location: s["Location"]
    };
  });
  return rows;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },

  columnHeader: {
    cursor: 'pointer'
  }
});

const generateRows = (searchText) => {
  const filtered = getMasterListMaterials().filter(material => {
    const lowercase = searchText.toLowerCase();
    if (!lowercase || lowercase.length < 1) {
      return true;
    }
    const searchable = Object.values(material).map(s => s ? s.toLowerCase() : '');
    const found = searchable.filter(s => s.includes(lowercase)).length > 0;
    return found;
  });
  return filtered;
}

export default function LeafShopMaterialsSection({ searchText, rows=generateRows(searchText) }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [selectedColumnHeader, setSelectedColumnHeader] = React.useState('Name');
  const [shouldReverseSort, setShouldReverseSort] = React.useState(false);

  // const [rows, setRows] = React.useState(generateRows());
  //const [sortedRows, setSortedRows] = React.useState(rows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleColumnHeaderClick = (columnLabel) => {
    setSelectedColumnHeader(columnLabel);

    if (selectedColumnHeader === columnLabel) {
      if (shouldReverseSort) {
        setShouldReverseSort(false);
      } else {
        setShouldReverseSort(true);
      }
    } else if (shouldReverseSort === true) { // disable reverse sort if we're changing section
      setShouldReverseSort(false);
    }
  }

  const sortRows = (toSort) => {
    const columnLabel = selectedColumnHeader;
    let sorted = toSort.sort((r1, r2) => {
      if (columnLabel === 'Name') {
        return r1.name.toLowerCase().localeCompare(r2.name.toLowerCase());
      } else if (columnLabel === 'Price') {
        const firstPrice = parseInt(r1.price.split(" ")[0].replace(",", ""), 10);
        const secondPrice = parseInt(r2.price.split(" ")[0].replace(",", ""), 10);
        return  secondPrice - firstPrice; 
      } else if (columnLabel === 'Location') {
        return r1.location.toLowerCase().localeCompare(r2.location.toLowerCase());
      } else {
        return r1-r2;
      }
    });

    if (shouldReverseSort) {
      sorted = sorted.reverse();
    }

    return sorted;
  }
 
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table>
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
            {sortRows(rows).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow role="checkbox" tabIndex={-1} key={row.code}>
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
