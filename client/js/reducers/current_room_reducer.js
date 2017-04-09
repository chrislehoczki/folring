
import { LOAD_CURRENT_ROOM, UPDATE_CURRENT_ROOM } from '../actions/types';

export default function(state = null, action) {
	
	switch (action.type) {
		case LOAD_CURRENT_ROOM: 
			return action.payload;
		break;
		case UPDATE_CURRENT_ROOM:
			return { ...state, ...action.payload };
		break;
	}	

	return state;
}