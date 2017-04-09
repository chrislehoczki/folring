import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import userReducer from './user_reducer';
import uiReducer from './ui_reducer';
import mainRoomReducer from './main_room_reducer';
import currentRoomReducer from './current_room_reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  ui: uiReducer,
  mainRooms: mainRoomReducer,
  currentRoom: currentRoomReducer
});

export default rootReducer;