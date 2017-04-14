
import axios from 'axios';


import { LOAD_USER, LOAD_CURRENT_ROOM } from './types';

import{ connect_socket } from './socket';


export function authenticateToken(token) {

  return function(dispatch) {
    const url = '/api/user';
    const options = {
      headers: { authorization: token }
    };

    axios.get(url, options)
      .then(response => {
        if (response.data.error) {
          window.localStorage.removeItem('apitoken');
        } else {
          dispatch({
            type: LOAD_USER,
            payload: response.data
          });
          dispatch({ type: LOAD_CURRENT_ROOM, payload: response.data.playingRooms[0] || null })

          connect_socket();

        }
   
      }).catch(err => {
      	console.log(err);
        dispatch({type: LOAD_USER, payload: null});
      });
    }

}

export function loginUser({email, password}) {
    const url = '/auth/login';
    const options = {
      email, password
    }

    return function(dispatch) {

       axios.post(url, options)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
          window.localStorage.removeItem('apitoken');
        } else {
          console.log(response.data);
          dispatch({
            type: LOAD_USER,
            payload: response.data
          });
          dispatch({ type: LOAD_CURRENT_ROOM, payload: response.data.playingRooms[0] || null })
          window.localStorage.setItem('apitoken', response.data.apitoken)
          connect_socket();

        }
   
      }).catch(err => {
        console.log(err);
        dispatch({type: LOAD_USER, payload: null});
      });
    }
  
}

export function logoutUser() {

  window.localStorage.removeItem('apitoken');
  return { type: LOAD_USER, payload: null };

}

export function signupUser({username, email, password}) {
    const url = '/auth/signup';
    const options = {
      username, email, password
    }

    return function(dispatch) {

       axios.post(url, options)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
          window.localStorage.removeItem('apitoken');
        } else {
          console.log(response.data);
          dispatch({
            type: LOAD_USER,
            payload: response.data
          });
          dispatch({ type: LOAD_CURRENT_ROOM, payload: response.data.playingRooms[0] || null })
          window.localStorage.setItem('apitoken', response.data.apitoken)
          connect_socket();

        }
   
      }).catch(err => {
        console.log(err);
        dispatch({type: LOAD_USER, payload: null});
      });
    }
  

}

export function loadUser(user) {
    return { type: LOAD_USER, payload: user }
}


