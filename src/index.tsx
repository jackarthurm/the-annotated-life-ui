import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom'
import {
  applyMiddleware,
  createStore,
  Store
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import AppContainer from './containers/app.container';
import './index.css';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

import * as WebFont from 'webfontloader';


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


const store: Store = createStore(
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
