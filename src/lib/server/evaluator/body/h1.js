import { isEmpty } from '../isEmpty';
import { isDuplicate } from '../isUnique';
import { STATUS } from '../config';

/**
 * Evaluates the H1 header(s) of a webpage to determine their status.
 *
 * This function checks the H1 data and determines its status (ok, multiple, or missing).
 * - If there's exactly one non-empty H1, it sets the status to 'ok'.
 * - If there are multiple H1 headers, it sets the status to 'multiple'.
 * - If the H1 is empty or not provided (empty array), it sets the status to 'missing'.
 *
 * @param {Array<string>} data - An array containing the H1 header(s) data.
 * @param {Array} all - Data set used for duplication check.
 * @returns {string} - Returns the determined status for the H1 headers.
 */
export function evaluateH1(data, all) {
	// Handle missing values upfront
	if (isEmpty(data) || isEmpty(data[0])) {
		return STATUS.MISSING;
	}

	// Check for multiple H1s
	if (data.length > 1) {
		return STATUS.MULTIPLE;
	}

	// Lastly check for duplicates
	return isDuplicate('h1', data[0], all) ? STATUS.DUPLICATE : STATUS.OK;
}
