import React,{useState} from 'react';
import './App.css';
import DashBoard from './components/admin/DashBoard';
import Content from './components/admin/Dashboard/Content/Content';
import {ThemeProvider,createMuiTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import Teams from './components/admin/Dashboard/Content/Teams/Teams';
import Projects from './components/admin/Dashboard/Content/Project/Projects';
import GroupAvator from './components/admin/Dashboard/Content/Teams/GroupAvator';
// import New from './components/Dashboard/new';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Dashboard from './components/admin/DashBoard';
function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      {/* <Paper> */}
        <Router>

              <Switch>
                <Route path="/admin/dashboard" exact component={DashBoard} />
                <Route path="/content" component={Content} />
                <Route path="/projects" component={Projects} />
                <Route path="/avator" component={GroupAvator} />
              </Switch>
          </Router>
        
      {/* </Paper> */}
     

    </ThemeProvider>
    
    </div>
  );
}

export default App;
