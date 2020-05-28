import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';

import LeafAppBar from './components/leafAppBar';
import LeafStepperPage from './pages/leafStepperPage';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00ae6f',
      contrastText: '#fff'
    },
  },
});

const useStyles = makeStyles((theme) => ({
  page: {
    marginTop: '80px',
  }
}));

export default function App() {
  const classes = useStyles();

  const getOptionalAppBarHeight = (defaultValue=50) => {
    const jsAppBar = document.body.getElementsByClassName("MuiAppBar-root");
    if (!jsAppBar || jsAppBar.length < 1) {
      return 0;
    }

    return jsAppBar[0].clientHeight;
  }

  const handleAddButtonClick = () => {

  }

  return (
    
    <React.Fragment>

      <ThemeProvider theme={theme}>
        <div className={classes.page}>
          <LeafStepperPage />
        </div>

        <LeafAppBar />
      </ThemeProvider>

    </React.Fragment>

  );
}
