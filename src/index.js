import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom'
import {
  createStore,
  applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import AppContainer from './containers/app.container';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import rootReducer from './reducers';


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
