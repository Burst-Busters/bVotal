import React from 'react';
import './App.css';
import { Route, Switch, Redirect, Link } from "react-router-dom";
import StartPage from './pages/start/StartPage';
import { AppBar, CssBaseline, Toolbar } from '@material-ui/core';
import CreatePinPage from './pages/create-pin/CreatePinPage';
import VotePage from './pages/vote/VotePage';
import ThankYouPage from './pages/thankyou/ThankYouPage';
import ErrorPage from './pages/error/ErrorPage';
//Custom CSS
import "./style/custom.css";
import RegisterPage from './pages/generate-passphrase/RegisterPage';
import WaitingActivationPage from './pages/waiting-activation/WaitingActivationPage';

function App() {

  return (
    <div className="App">
      <CssBaseline />
      <AppBar color="inherit" className="box_shadow" position="relative">
        <Toolbar>
          <Link to="/"><img style={{maxHeight: 30 }} alt="bVotal" src="bvotal-logo.png" /></Link>
        </Toolbar>
      </AppBar>
      <main>
        <Switch>
          <Route path="/" exact component={StartPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/create-pin" exact component={CreatePinPage} />
          <Route path="/waiting-activation" exact component={WaitingActivationPage} />
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
