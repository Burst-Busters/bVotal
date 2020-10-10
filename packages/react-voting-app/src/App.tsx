import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import StartPage from './pages/start/StartPage';
import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import GeneratePassphrasePage from './pages/generate-passphrase/GeneratePassphrasePage';
import CreatePinPage from './pages/create-pin/CreatePinPage';
function App() {

  return (
    <div className="App">
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <MenuIcon />
          <Typography variant="h6" color="inherit" noWrap>
            bVote
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Switch>
          <Route path="/" exact component={StartPage} />
          <Route path="/generate-passphrase" exact component={GeneratePassphrasePage} />
          <Route path="/create-pin" exact component={CreatePinPage} />
          <Route path='/default' render={() => <Redirect to= "/" />} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
