
import { UPDATE_UI } from './types';


export function updateUI(config) {
	return {type: UPDATE_UI, payload: config};
}