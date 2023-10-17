import { isEmpty } from '../isEmpty';
import { isDuplicate } from '../isUnique';

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
 * @returns {string} - The category into which the description's length falls ('ok', 'short', 'long', or 'missing').
 */
export function evaluateDescription(value, all) {
	if (!isEmpty(value)) {
		if (isDuplicate('OGtitle', value, all)) {
			return 'duplicate';
		} else if (value.length >= 50 && value.length < 200) {
			return 'ok';
		} else if (value.length < 50) {
			return 'short';
		} else if (value.length >= 200) {
			return 'long';
		}
	} else {
		return 'missing';
	}
}
