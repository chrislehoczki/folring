import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import userReducer from './user_reducer';
import uiReducer from './ui_reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  ui: uiReducer
});

export default rootReducer;