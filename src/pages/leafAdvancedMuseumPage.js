import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

import LeafBaseMuseumPage from './leafBaseMuseumPage';
import LeafCookies from '../backend/leafCookies';

const getSelectedTabCookie = () => {
  const cookie = LeafCookies.getCookie('leaf_advancedMuseumPage_selectedTab');
  if (!cookie || cookie.length < 1) {
    return 'everything';
  }

  return cookie;
}

const setSelectedTabCookie = (value) => {
  const cookie = LeafCookies.setCookie('leaf_advancedMuseumPage_selectedTab', value);
}

export default function LeafAdvancedMuseumPage(props) {
  const [selectedTab, setSelectedTab] = React.useState(getSelectedTabCookie());
  
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedTabCookie(newValue);
  }

  const tabAppBar = (
    <AppBar position="static">      
      <Tabs value={ selectedTab } onChange={ handleTabChange } variant="scrollable" scrollButtons="auto" aria-label="tabs">
        <Tab label="Everything" value="everything" />
        <Tab label="Bugs" value="insects" />
        <Tab label="Fish" value="fish" />    
        <Tab label="Sea Creatures" value="seacreatures" />     
        <Tab label="Fossils" value="fossils" />           
        <Tab label="Art" value="art" />  
      </Tabs>
    </AppBar>
  );

  return (
    <LeafBaseMuseumPage 
      selectedTab={selectedTab}
      tabAppBar={tabAppBar}
      {...props}
    />
  );
}