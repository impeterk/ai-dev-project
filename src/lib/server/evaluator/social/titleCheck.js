import { isEmpty } from '../isEmpty';
import { isDuplicate } from '../isUnique';
import { STATUS } from '../config';

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
 * @param {Array} all - Data set used for duplication check.
 * @returns {string} - The evaluation result based on the title's length and presence.
 */
export function evaluateTitle(value, all) {
	if (isEmpty(value)) {
		return STATUS.MISSING;
	}

	if (isDuplicate('OGtitle', value, all)) {
		return STATUS.DUPLICATE;
	}

	if (value.length >= 60 && value.length <= 88) {
		return STATUS.OK;
	}

	if (value.length < 60) {
		return STATUS.SHORT;
	}

	return STATUS.LONG; // If none of the above conditions, return stats 'long'
}
