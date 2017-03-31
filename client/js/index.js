// import { Router } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';

// import routes from './routes/routes';

import BasicExample from './components/App.js';
import { socket } from './socket/socket_client';

socket().then(() => {
	ReactDOM.render(
  	<BasicExample />
  , document.querySelector('#root'));

}).catch((err) => {
	console.log('couldnt access socket')
});

