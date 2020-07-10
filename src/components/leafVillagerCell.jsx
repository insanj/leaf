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

export default function LeafVillagerCell({ villager, loadedVillagers, onVillagerIconClick }) {
  return (
    <TableRow key={villager.name} style={{opacity: loadedVillagers && loadedVillagers.filter(v => v === villager.name).length > 0 ? 0.2 : 1.0}}>
    <TableCell component="th" scope="row">
      <img src={ villager.image } width="80" height="80" style={{borderRadius: 10, cursor: 'pointer'}} onClick={() => onVillagerIconClick(villager)} />
    </TableCell>
    <TableCell align="left" style={{ fontSize: '1.4em', fontWeight: 500 }}>
      {villager.name}
    </TableCell>
    <TableCell align="left">{villager.personality}</TableCell>
    <TableCell align="left">{villager.species}</TableCell>
    <TableCell align="left">{villager.birthday}</TableCell>
    <TableCell align="left">{villager.catchphrase}</TableCell>
    <TableCell align="left">{villager.hobby}</TableCell>
    <TableCell align="left">{villager.colors}</TableCell>
    <TableCell align="left">{villager.styles}</TableCell>
  </TableRow>
  )
}