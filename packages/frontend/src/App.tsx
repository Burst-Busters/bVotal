import React from 'react';
import logo from './logo.svg';
import './App.css';

import {hashId} from '@bvotal/common'

function App() {

  const hash = hashId({id:'1244', dob:'12-12-2345'})

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{hash}</p>
      </header>
    </div>
  );
}

export default App;
