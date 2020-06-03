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
    id: 'buyPrice', 
    label: 'Price to Buy', 
    align: 'left',
  },
    {
    id: 'sellPrice',
    label: 'Selling Price',
    align: 'center',
  },
  {
    id: 'materials',
    label: 'Materials Needed',
    align: 'center',
  },
  {
    id: 'durability',
    label: 'Durability',
    align: 'center',
  },
];

const getMasterListTools = () => {
  const materials = acnh_master_list["Tools"];
  const rows = materials.map(s => {
    return {
      name: s["Tools"],
      buyPrice: s["Price to Buy"],
      sellPrice: s["Selling Price"],
      materials: s["Materials Needed"],
      durability: s["Durability"]
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
  const filtered = getMasterListTools().filter(tool => {
    const lowercase = searchText.toLowerCase();
    if (!lowercase || lowercase.length < 1) {
      return true;
    }
    const searchable = Object.values(tool).map(s => s.toLowerCase());
    const found = searchable.filter(s => s.includes(lowercase)).length > 0;
    return found;
  });
  return filtered;
}

export default function LeafShopToolsSection({ searchText, rows=generateRows(searchText) }) {
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
      } else if (columnLabel === 'Price to Buy') {
        const firstPrice = parseInt(r1.buyPrice.split(" ")[0].replace(",", ""), 10);
        if (isNaN(firstPrice)) {
          return 1;
        }

        const secondPrice = parseInt(r2.buyPrice.split(" ")[0].replace(",", ""), 10);
        if (isNaN(secondPrice)) {
          return -1;
        }

        return  secondPrice - firstPrice; 
      } else if (columnLabel === 'Selling Price') {
        const firstPrice = parseInt(r1.sellPrice.split(" ")[0].replace(",", ""), 10);
        if (isNaN(firstPrice)) {
          return 1;
        }

        const secondPrice = parseInt(r2.sellPrice.split(" ")[0].replace(",", ""), 10);
        if (isNaN(secondPrice)) {
          return -1;
        }

        return secondPrice - firstPrice; 
      } else if (columnLabel === 'Durability') {
        return r1.durability.toLowerCase().localeCompare(r2.durability.toLowerCase());
      } else if (columnLabel === 'Materials Needed') {
        return r1.materials.toLowerCase().localeCompare(r2.materials.toLowerCase());
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
