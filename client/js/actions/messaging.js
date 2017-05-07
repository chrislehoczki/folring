
import { ADD_MESSAGE } from './types';

export function addMessage(config) {
	console.log('CONFIG', config)
	
	return {type: ADD_MESSAGE, payload: config};
}