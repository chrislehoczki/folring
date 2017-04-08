import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
// middleware
import reduxThunk from 'redux-thunk';

// import the root reducer
import rootReducer from './reducers/index';
import logger from 'redux-logger';
// create our store based on whether we are in dev or production mode

let store, middleware;
let middlewares = [reduxThunk];

if (process.env.NODE_ENV != 'production') {
	const { composeWithDevTools } = require('redux-devtools-extension');

	middlewares = [...middlewares, logger];

	middleware = applyMiddleware(...middlewares);

	// get preloaded state and if we have rendered server side, populate store with it
	const preloadedState = window.__PRELOADED_STATE__;
	if (!preloadedState) {
		store = createStore(rootReducer, composeWithDevTools(middleware));
	}
	else {
		store = createStore(rootReducer, preloadedState, composeWithDevTools(middleware));
	}
	
} else {
	
	middlewares = [...middlewares];
	middleware = applyMiddleware(...middlewares);
	
	// Grab the state from a global injected into server-generated HTML
	const preloadedState = window.__PRELOADED_STATE__;
	if (!preloadedState) {
		store = createStore(rootReducer, middleware);
	} else {
		// Create Redux store with initial state
		store = createStore(rootReducer, preloadedState, middleware);
	}

	
}

// export const history = syncHistoryWithStore(browserHistory, store);

export default store;