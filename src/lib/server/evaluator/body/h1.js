import { isEmpty } from '../isEmpty';
import { isDuplicate } from '../isUnique';

/**
 * Evaluates the H1 header(s) of a webpage to determine their status.
 *
 * This function checks the H1 data and determines its status (ok, multiple, or missing).
 * - If there's exactly one non-empty H1, it sets the status to 'ok'.
 * - If there are multiple H1 headers, it sets the status to 'multiple'.
 * - If the H1 is empty or not provided (empty array), it sets the status to 'missing'.
 *
 * @param {Object} config - The configuration object containing domain, date of scan, and URL ID.
 * @param {Array<string>} data - An array containing the H1 header(s) data.
 * @returns {string} - Returns the determined status for the H1 headers.
 */
export function evaluateH1(data, all) {
	let h1Status = 'missing'; // default value

	if (!isEmpty(data) && !isEmpty(data[0])) {
		if (data.length === 1) {
			if (isDuplicate('h1', data[0], all)) {
				h1Status = 'duplicate';
			} else {
				h1Status = 'ok';
			}
		} else if (data.length > 1) {
			h1Status = 'multiple';
		} else if (h1Length === 0 || data.length < 1) {
			h1Status = 'missing';
		}
	}

	return h1Status;
}
