import { isEmpty } from '../isEmpty';
import { isDuplicate } from '../isUnique';
import { STATUS } from '../config';

/**
 * Evaluates the length of a given description and categorizes it into one of several predefined groups.
 *
 * This function checks the length of a description and classifies it as:
 * - 'ok': If its length is between 50 and 200 characters, inclusive of 50 and exclusive of 200.
 * - 'short': If its length is less than 50 characters.
 * - 'long': If its length is 200 characters or more.
 * - 'missing': If the description is either null, undefined, or an empty string.
 *
 * @param {string} value - The description to be evaluated.
 * @param {Array} all - Data set used for duplication check.
 * @returns {string} - The category into which the description's length falls ('ok', 'short', 'long', or 'missing').
 */
export function evaluateDescription(value, all) {
	if (isEmpty(value)) {
		return STATUS.MISSING;
	}

	if (isDuplicate('OGtitle', value, all)) {
		return STATUS.DUPLICATE;
	}

	if (value.length >= 50 && value.length < 200) {
		return STATUS.OK;
	}

	if (value.length < 50) {
		return STATUS.SHORT;
	}

	return STATUS.LONG; // If none of the above conditions, return status 'long'.
}
