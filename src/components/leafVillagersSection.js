import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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


import fandom_villagers_scraped from '../data/fandom_villagers_scraped';

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

export default function LeafVillagersSection({ searchText, villagers=fandom_villagers_scraped }) {
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
      <TableRow key={villager.name}>
        <TableCell component="th" scope="row">
          <img src={ villager.image } width="80" height="80" style={{borderRadius: 10}} />
        </TableCell>
        <TableCell align="left" style={{ fontSize: '1.4em', fontWeight: 500 }}>
          {villager.name}
        </TableCell>
        <TableCell align="left">{villager.personality}</TableCell>
        <TableCell align="left">{villager.species}</TableCell>
        <TableCell align="left">{villager.birthday}</TableCell>
        <TableCell align="left">{villager.catchphrase}</TableCell>
        <TableCell align="left">{villager.hobby}</TableCell>
      </TableRow>
    );
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
            </TableRow>
          </TableHead>

          <TableBody>
            { generatePanels() }
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
}
