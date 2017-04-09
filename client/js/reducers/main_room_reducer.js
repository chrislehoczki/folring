
import { LOAD_MAIN_ROOMS } from '../actions/types';

export default function(state = [], action) {
	
	switch (action.type) {
		case LOAD_MAIN_ROOMS: 
			return action.payload;
		break;
	}	

	return state;
}