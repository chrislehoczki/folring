
import { TOGGLE_NOTIFICATION } from '../actions/types';

export default function(state = {notification: 'test notification', show: true}, action) {
	
	switch (action.type) {
		case TOGGLE_NOTIFICATION:
			return action.payload;
	}

	return state;
}