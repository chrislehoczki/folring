

import { TOGGLE_NOTIFICATION } from './types';

export function toggleNotification(notification) {
	return function(dispatch) {
		dispatch({type: TOGGLE_NOTIFICATION , payload: notification});
		setTimeout(() => {
			dispatch({type: TOGGLE_NOTIFICATION, payload: {show: false, notification: ''}})
		}, 2000)
	}
	
}
