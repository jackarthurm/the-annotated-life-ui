import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom'
import {
  createStore,
  applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import injectTapEventPlugin from 'react-tap-event-plugin';

import AppContainer from './containers/app.container';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import rootReducer from './reducers';

import WebFont from 'webfontloader';

const TITLE_TEXT = 'TheAnnotatedLife';


WebFont.load({
  google: {
    families: ['Cinzel Decorative:400:latin'],
    text: TITLE_TEXT
  }
});

WebFont.load({
  google: {
    families: ['Alegreya:400:latin', 
               'Alegreya SC:400:latin']
  }
});


injectTapEventPlugin();

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
		<Router>
      <AppContainer />
		</Router>
	</Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
