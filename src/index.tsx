import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import * as WebFont from 'webfontloader';
import { App } from './app';

const TITLE_TEXT = 'TheAnnotatedLife';

WebFont.load({
  google: {
    families: ['Cinzel Decorative:400:latin'],
    text: TITLE_TEXT,
  },
});

WebFont.load({
  google: {
    families: ['Alegreya:400:latin', 'Alegreya SC:400:latin'],
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
