import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import LeafShopShellSection from './leafShopShellSection';
import LeafShopMaterialsSection from './leafShopMaterialsSection';
import LeafShopToolsSection from './leafShopToolsSection';
import LeafShopFlooringSection from './leafShopFlooringSection';
import LeafShopFlowersSection from './leafShopFlowersSection';
import LeafShopFruitSection from './leafShopFruitSection';
import LeafShopFurnitureSection from './leafShopFurnitureSection';
import LeafShopRugsSection from './leafShopRugsSection';
import LeafShopWallpapersSection from './leafShopWallpapersSection';

import tile1 from '../img/sprites/tiles-1.png';
import tile138 from '../img/sprites/tiles-138.png';
import tile55 from '../img/sprites/tiles-55.png';
import tile201 from '../img/sprites/tiles-201.png';
import tile267 from '../img/sprites/tiles-267.png';
import tile88 from '../img/sprites/tiles-88.png';
import tile118 from '../img/sprites/tiles-118.png';
import tile116 from '../img/sprites/tiles-116.png';
import tile172 from '../img/sprites/tiles-172.png';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px',
    width: '98vw - 20px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

export default function LeafShopTable({ searchText }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>


      <ExpansionPanel className="flooringSection">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
           <img src={tile118} width="28" height="28" style={{
              position: 'absolute',
              objectFit: 'contain'
            }}/>
          <span style={{paddingLeft: '34px'}}>Flooring</span>
          </Typography>

        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            
            <LeafShopFlooringSection
              searchText={searchText}
            />

          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className="flowersSection">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
           <img src={tile267} width="28" height="28" style={{
              position: 'absolute',
              objectFit: 'contain'
            }}/>
          <span style={{paddingLeft: '34px'}}>Flowers</span>
          </Typography>

        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            
            <LeafShopFlowersSection
              searchText={searchText}
            />

          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className="fruitSection">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            <img src={tile201} width="28" height="28" style={{
              position: 'absolute',
              objectFit: 'contain'
            }}/>
            <span style={{paddingLeft: '34px'}}>Fruit</span>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>

          <Typography>
            
            <LeafShopFruitSection 
              searchText={searchText}
            />

          </Typography>

        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className="furnitureSection">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            <img src={tile88} width="28" height="28" style={{
              position: 'absolute',
              objectFit: 'contain'
            }}/>
            <span style={{paddingLeft: '34px'}}>Furniture</span>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>

          <Typography>
            
            <LeafShopFurnitureSection
              searchText={searchText}
            />

          </Typography>

        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className="materialsSection">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
          <img src={tile55} width="28" height="28" style={{
            position: 'absolute',
            objectFit: 'contain'
          }}/>
          <span style={{paddingLeft: '34px'}}>Materials</span>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
              
          <LeafShopMaterialsSection 
            searchText={searchText}
          />

        </ExpansionPanelDetails>
      </ExpansionPanel>


      <ExpansionPanel className="rugsSection">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            <img src={tile116} width="28" height="28" style={{
              position: 'absolute',
              objectFit: 'contain'
            }}/>
            <span style={{paddingLeft: '34px'}}>Rugs</span>
        </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            
            <LeafShopRugsSection 
              searchText={searchText}
            />

          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className="shellsSection">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            <img src={tile138} width="28" height="28" style={{
              position: 'absolute',
              objectFit: 'contain'
            }}/>
            <span style={{paddingLeft: '34px'}}>Shells</span>
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <LeafShopShellSection 
            searchText={searchText}
          />

        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel className="toolsSection">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            <img src={tile1} width="28" height="28" style={{
              position: 'absolute',
              objectFit: 'contain'
            }}/>
            <span style={{paddingLeft: '34px'}}>Tools</span>
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          
          <LeafShopToolsSection 
            searchText={searchText}
          />

        </ExpansionPanelDetails>
      </ExpansionPanel>


      <ExpansionPanel className="wallpapersSection">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>

            <img src={tile172} width="28" height="28" style={{
              position: 'absolute',
              objectFit: 'contain'
            }}/>
            <span style={{paddingLeft: '34px'}}>Wallpapers</span>

          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            
            <LeafShopWallpapersSection
              searchText={searchText}
            />

          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

    </div>
  );
}