// import { Router } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';

// import routes from './routes/routes';

import App from './components/App.js';


import {
  BrowserRouter as Router
} from 'react-router-dom'

// redux store
import store from './store';

import { Provider } from 'react-redux';

ReactDOM.render(
		<Provider store={ store }>
			<Router>
	  			<App />
	  		</Router>
  		</Provider>
  , document.querySelector('#root'));

