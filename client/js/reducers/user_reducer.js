
import { LOAD_USER } from '../actions/types';

export default function(state = {username: null}, action) {
	
	switch (action.type) {
		case LOAD_USER: 
			return action.payload;
		break;
	}	

	return state;
}