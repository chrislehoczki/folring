
import axios from 'axios';


import { LOAD_USER } from './types';

import{ connect_socket } from './socket';


export function authenticateToken(token) {

  return function(dispatch) {
    const url = '/api/user';
    const options = {
      headers: { authorization: token }
    };

    axios.get(url, options)
      .then(response => {
        if (response.error) {
          localStorage.removeItem('apitoken');
        } else {
          dispatch({
            type: LOAD_USER,
            payload: response.data
          });

          connect_socket();

        }
   
      }).catch(err => {
      	console.log(err);
        dispatch({type: LOAD_USER, payload: null});
      });
    }

}


