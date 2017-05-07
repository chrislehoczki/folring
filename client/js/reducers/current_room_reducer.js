
import { LOAD_CURRENT_ROOM, UPDATE_CURRENT_ROOM, ADD_MESSAGE } from '../actions/types';

export default function(state = {messages: []}, action) {
	
	switch (action.type) {
		case LOAD_CURRENT_ROOM: 
			return action.payload;
		break;
		case UPDATE_CURRENT_ROOM:
			return { ...state, ...action.payload };
		break;
		case ADD_MESSAGE:
			return { ...state, messages: [...state.messages, action.payload ]}
	}	

	return state;
}