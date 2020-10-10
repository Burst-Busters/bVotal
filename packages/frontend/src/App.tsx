import React from 'react';
import logo from './logo.svg';
import './App.css';
import {FormattedMessage } from 'react-intl';
import {hashId} from '@bvotal/common'

function App() {

  const hash = hashId({id:'1244', dob:'12-12-2345'})

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <FormattedMessage id="app.initialText"
            defaultMessage="Edit <code>src/App.js</code> and save to reload {appName}."
            values={{
              code: (chunks: string[]) => <code>{chunks}</code>, // this is needed to declare the <code> tag for the formattedMessage component!!
              appName: `bVotal`
            }}
            description="Initial text on the app.tsx" />
        </p>
        <h2>
        <FormattedMessage id="app.exampleHash"
          defaultMessage="Example Hash:"
          description="example hash on homepage" />
        </h2>
        <p>{hash}</p>
      </header>
    </div>
  );
}

export default App;
