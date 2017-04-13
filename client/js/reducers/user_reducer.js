
import { LOAD_USER, ADD_USER_ROOM, DELETE_USER_ROOM } from '../actions/types';

export default function(state = null, action) {
	
	switch (action.type) {
		case LOAD_USER: 
			return action.payload;
		break;
		case ADD_USER_ROOM:
			return { ...state, ownedRooms: [...state.ownedRooms, action.payload]};
		break;
		case DELETE_USER_ROOM:
			const deleteRoomIndex = state.ownedRooms.findIndex((room) => room._id === action.payload);
			console.log('index', deleteRoomIndex)
			return { ...state, ownedRooms: [...state.ownedRooms.slice(0, deleteRoomIndex), ...state.ownedRooms.slice(deleteRoomIndex + 1)]}
	}	

	return state;
}