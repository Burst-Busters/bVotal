import React from 'react';
import logo from '../../logo.svg';
import './StartPage.css';
import {FormattedMessage } from 'react-intl';
import {hashId} from '@bvotal/common'

function StartPage() {

  const hash = hashId({id:'1244', dob:'12-12-2345'})

  return (
    <div className="StartPage">
      <header className="StartPage-header">
        <img src={logo} className="StartPage-logo" alt="logo" />
        <p>
          <FormattedMessage id="StartPage.initialText"
            defaultMessage="Edit <code>src/StartPage.js</code> and save to reload {StartPageName}."
            values={{
              code: (chunks: string[]) => <code>{chunks}</code>, // this is needed to declare the <code> tag for the formattedMessage component!!
              StartPageName: `bVotal`
            }}
            description="Initial text on the StartPage.tsx" />
        </p>
        <h2>
        <FormattedMessage id="StartPage.exampleHash"
          defaultMessage="Example Hash:"
          description="example hash on homepage" />
        </h2>
        <p>{hash}</p>
      </header>
    </div>
  );
}

export default StartPage;
