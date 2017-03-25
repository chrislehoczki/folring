
import { socket } from './socket/socket';
import React from 'react';
import ReactDOM from 'react-dom';
import Tolring from './components/Tolring';

socket();

ReactDOM.render(
  <Tolring />
  , document.querySelector('#root'));