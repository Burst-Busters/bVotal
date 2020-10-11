import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import StartPage from './pages/start/StartPage';
import { AppBar, CssBaseline, Toolbar } from '@material-ui/core';
import GeneratePassphrasePage from './pages/generate-passphrase/GeneratePassphrasePage';
import CreatePinPage from './pages/create-pin/CreatePinPage';
import VotePage from './pages/vote/VotePage';
import ThankYouPage from './pages/thankyou/ThankYouPage';
import ErrorPage from './pages/error/ErrorPage';
//Custom CSS
import "./style/custom.css";

function App() {

  return (
    <div className="App">
      <CssBaseline />
      <AppBar color="inherit" className="box_shadow" position="relative">
        <Toolbar>
          <img style={{maxHeight: 30 }} alt="bVotal" src="bvotal-logo.png" />
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
