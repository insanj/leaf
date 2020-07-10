import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import LeafVillagerCell from './leafVillagerCell';

import fandom_villagers_scraped from '../data/fandom_villagers_scraped';
import nintendolife_villager_gift_guide from '../data/nintendolife_villager_gift_guide';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    paddingLeft: 20,
    fontSize: theme.typography.pxToRem(33),
    color: theme.palette.text.secondary,
  },
}));

const mergedData = () => {
  let villagers = fandom_villagers_scraped;
  let giftGuide = nintendolife_villager_gift_guide;
  let merged = fandom_villagers_scraped.map(v => {
    const giftGuideEntry = giftGuide.filter(g => g.name === v.name)[0];
    v.colors = giftGuideEntry.colors;
    v.styles = giftGuideEntry.styles;
    return v;
  });
  return merged;
}

export default function LeafVillagersSection({ searchText, villagers=mergedData(), onVillagerIconClick, loadedVillagers }) {
  const classes = useStyles();
  const [expandedVillager, setExpandedVillager] = React.useState('');

  const handleVillagerExpand = (villagerName) => {
    if (villagerName === expandedVillager) {
      setExpandedVillager('');
    } else {
      setExpandedVillager(villagerName);
    }
  }

  const generateVillagerPanel = (villager) => {
    return (
      <LeafVillagerCell
        villager={ villager }
        loadedVillagers={ loadedVillagers }
        onVillagerIconClick={ onVillagerIconClick }
      />
    );
  }

  const [tablePage, setTablePage] = React.useState(0);
  const [tableRowsPerPage, setTableRowsPerPage] = React.useState(25);

  const handleChangeTablePage = (event, newPage) => {
    setTablePage(newPage);
  }

  const handleChangeTableRowsPerPage = (event) => {
    setTableRowsPerPage(parseInt(event.target.value, 10));
    setTablePage(0);
  }

  const generatePanels = () => {
    const lowercased = searchText.toLowerCase();
    const filtered = lowercased && lowercased.length > 0 ? villagers.filter(v => {
      const vals = Object.values(v).map(val => val.toLowerCase());
      for (let val of vals) {
        if (val.includes(lowercased)) {
          return true;
        }
      }

      return false;
    }) : villagers;


    const panels = filtered.map(v => {
      return generateVillagerPanel(v);
    });

    return panels;
  } 

  const generatedPanels = generatePanels();
  const readyToDisplayPanels = generatedPanels.slice(tablePage * tableRowsPerPage, tablePage * tableRowsPerPage + tableRowsPerPage);

  return (
    <div className={classes.root}>
       <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Personality</TableCell>
              <TableCell align="left">Species</TableCell>
              <TableCell align="left">Birthday</TableCell>
              <TableCell align="left">Catchphrase</TableCell>
              <TableCell align="left">Hobby</TableCell>
              <TableCell align="left">Color(s)</TableCell>
              <TableCell align="left">Style(s)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            { readyToDisplayPanels }
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={ generatedPanels.length }
                rowsPerPageOptions={[10, 25, 50, 100, { label: 'All', value: -1 }]}
                rowsPerPage={ tableRowsPerPage }
                page={ tablePage }
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={ handleChangeTablePage }
                onChangeRowsPerPage={handleChangeTableRowsPerPage }
                ActionsComponent={ TablePaginationActions }
              />
            </TableRow>
          </TableFooter>

        </Table>
      </TableContainer>
    </div>
  );
}
