
import { UPDATE_UI } from '../actions/types';

export default function(state = {login: false}, action) {
	
	switch (action.type) {
		case UPDATE_UI:
			return { ...state, ...action.payload }
	}	

	return state;
}