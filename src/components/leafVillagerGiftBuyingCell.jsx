import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import StyleIcon from '@material-ui/icons/Style';
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10,
    textShadow: '0px 0px 5px black'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function LeafVillagerGiftBuyingCell({ villager, checked=false, onVillagerClick }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const getHTMLColorFromVillagerColor = (color) => {
    const naive = color.toLowerCase(); // villager.colors.split(",")[0].toLowerCase();
    if (naive === 'colorful') {
      return 'pink';
    }

    return naive;
  }

  return (
    <Card className={classes.root} style={{
      backgroundImage: `url(${villager.image})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      cursor: 'pointer',
      opacity: checked === true ? 0.4 : 1.0
    }} onClick={() => onVillagerClick(villager) }>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          { villager.birthday }
        </Typography>
        <Typography variant="h5" component="h2">
          { villager.name }
        </Typography>
        <Typography className={classes.pos}>
          { villager.personality }
        </Typography>
        <Typography variant="body2" component="p">
          <div className={classes.villagerColor} style={{
            width: 18,
            height: 18,
            borderRadius: 12,
            marginRight: 5,
            marginBottom: 4,
            backgroundColor: getHTMLColorFromVillagerColor(villager.colors.split(",")[0]),
            display: 'inline-block',
            verticalAlign: 'middle',
            filter: 'drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.6))',
            borderWidth: 3,
            borderStyle: 'solid',
            borderColor: getHTMLColorFromVillagerColor(villager.colors.split(",").length > 1 ? villager.colors.split(",")[1] : villager.colors.split(",")[0])
          }}/>

          { villager.colors }

          <br />

          <div className={classes.villagerColor} style={{
            verticalAlign: 'middle',
            marginRight: 5,
            display: 'inline-block',
            filter: 'drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.6))'
          }}>
            <StyleIcon />
          </div>

          { villager.styles }
          <br/>

          <div className={classes.villagerColor} style={{
            verticalAlign: 'middle',
            marginRight: 5,
            display: 'inline-block',
            filter: 'drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.6))'
          }}>
            <SentimentVerySatisfiedIcon />
          </div>

          { villager.hobby }
        </Typography>
      </CardContent>
      <CardActions>
        <Checkbox
          checked={checked}
          onChange={() => onVillagerClick(villager)}
          color="secondary"
          size="large"
        />
      </CardActions>
    </Card>
  );

  // return (
  //   <TableRow key={villager.name} onClick={ onVillagerClick }>


  //     <TableCell component="th" scope="row">
  //       <img src={ villager.image } width="80" height="80" style={{borderRadius: 10, cursor: 'pointer'}}/>
  //     </TableCell>
  //     <TableCell align="left" style={{ fontSize: '1.4em', fontWeight: 500 }}>
  //       {villager.name}
  //     </TableCell>
  //     <TableCell align="left">{villager.colors}</TableCell>
  //     <TableCell align="left">{villager.styles}</TableCell>
  //     <TableCell align="left">{villager.colors}</TableCell>
  //     <TableCell align="left">{villager.hobby}</TableCell>
  //     <TableCell align="left">{villager.birthday}</TableCell>
  //   </TableRow>
  // )
}