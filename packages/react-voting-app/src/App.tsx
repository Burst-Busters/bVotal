import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import StartPage from './pages/start/StartPage';
function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={StartPage} />
        <Route path='/default' render={() => <Redirect to= "/" />} />
      </Switch>
    </div>
  );
}

export default App;
