import { isEmpty } from '../isEmpty';
import { isDuplicate } from '../isUnique';

/**
 * Evaluates the length of a given title and categorizes it as 'ok', 'short', 'long', or 'missing'.
 *
 * This function checks the length of the provided title:
 * - 'ok': If the title length is between 60 (inclusive) and 88 (inclusive).
 * - 'short': If the title length is less than 60 characters.
 * - 'long': If the title length is more than 88 characters.
 * - 'missing': If the title is null, undefined, or an empty string.
 *
 * @param {string} value - The title string to be evaluated.
 * @returns {string} - The evaluation result based on the title's length and presence.
 */
export function evaluateTitle(value, all) {
	if (!isEmpty(value)) {
		if (isDuplicate('OGtitle', value, all)) {
			return 'duplicate';
		} else if (value.length >= 60 && value.length <= 88) {
			return 'ok';
		} else if (value.length < 60) {
			return 'short';
		} else if (value.length > 88) {
			return 'long';
		}
	} else {
		return 'missing';
	}
}
