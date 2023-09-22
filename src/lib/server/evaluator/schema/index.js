import { isEmpty } from '../isEmpty';

/**
 * Evaluates the presence of schema data on a webpage.
 *
 * This function checks if the provided schema data is present or missing.
 * If the schema data is empty or not provided, the status is set to 'missing'.
 * Otherwise, the status is set to 'ok', indicating the schema data's presence.
 *
 * @param {Object|string|Array} data - The schema data to be evaluated. This can be an object, string, or array representing the schema data of a webpage.
 * @returns {string} - Returns 'ok' if schema data is present; otherwise, returns 'missing'.
 */
export function checkSchemaData(data) {
	if (isEmpty(data)) {
		return 'missing';
	} else {
		return 'ok';
	}
}
