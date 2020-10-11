import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import StartPage from './pages/start/StartPage';
import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import GeneratePassphrasePage from './pages/generate-passphrase/GeneratePassphrasePage';
import CreatePinPage from './pages/create-pin/CreatePinPage';
import VotePage from './pages/vote/VotePage';
import ThankYouPage from './pages/thankyou/ThankYouPage';
import ErrorPage from './pages/error/ErrorPage';
function App() {

  return (
    <div className="App">
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <img style={{maxHeight: 50 }} src="bvotal-logo.png" />
        </Toolbar>
      </AppBar>
      <main>
        <Switch>
          <Route path="/" exact component={StartPage} />
          <Route path="/generate-passphrase" exact component={GeneratePassphrasePage} />
          <Route path="/create-pin" exact component={CreatePinPage} />
          <Route path="/vote" exact component={VotePage} />
          <Route path="/thank-you" exact component={ThankYouPage} />
          <Route path="/error" exact component={ErrorPage} />
          <Route path='/default' render={() => <Redirect to= "/" />} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
