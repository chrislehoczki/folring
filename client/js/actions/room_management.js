
import axios from 'axios';
import { ADD_ROOM, DELETE_ROOM, ADD_USER_ROOM, DELETE_USER_ROOM } from './types';

export function addRoom(roomName) {
	console.log(roomName)
	return function(dispatch) {
	   
	    const options = {
	      headers: { authorization: window.localStorage.apitoken },
	      method: 'POST',
	      url: '/api/room',
	      data: {
	      	roomName
	      }
	    };

	    axios(options)
	      .then(response => {
	        if (response.error) {
	          console.log(response.error);
	        } else {
	        	const newRoom = response.data;
	          dispatch({
	            type: ADD_USER_ROOM,
	            payload: response.data
	          });

	        }
	   
	      }).catch(err => {
	      	console.log(err);
	      });
    }

}

export function deleteRoom(roomId) {
	return function(dispatch) {
	   
	    const options = {
	      headers: { authorization: window.localStorage.apitoken },
	      method: 'DELETE',
	      url: `/api/room/${roomId}`
	    };

	    console.log(options);
	    axios(options)
	      .then(response => {
	        if (response.error) {
	          console.log(response.error);
	        } else {
	          dispatch({
	            type: DELETE_USER_ROOM,
	            payload: response.data.roomId
	          });

	        }
	   
	      }).catch(err => {
	      	console.log(err);
	      });
    }

}