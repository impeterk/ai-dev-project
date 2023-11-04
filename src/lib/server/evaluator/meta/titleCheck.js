import { isEmpty } from '../isEmpty';
import { isDuplicate } from '../isUnique';
import { STATUS } from '../config';

/**
 * Assesses the length and presence of a given webpage title.
 *
 * This function evaluates a webpage title based on its length. It categorizes the title into:
 * - 'ok': if the length is between 50 and 59 characters inclusive.
 * - 'short': if the length is less than 50 characters.
 * - 'long': if the length is 60 characters or more.
 * - 'missing': if the title is absent or an empty string.
 *
 * The aforementioned categorization follows best practices for SEO (Search Engine Optimization),
 * where titles between 50-60 characters are generally considered optimal for most search engines.
 *
 * @param {string} value - The webpage title to be evaluated.
 * @param {Array} all - Data set used for duplication check.
 * @returns {string} - A string indicating the assessment result ('ok', 'short', 'long', or 'missing').
 */
export function evaluateTitle(value, all) {
	if (isEmpty(value)) {
		return STATUS.MISSING;
	}

	if (isDuplicate('title', value, all)) {
		return STATUS.DUPLICATE;
	}

	if (value.length >= 50 && value.length < 60) {
		return STATUS.OK;
	}

	if (value.length < 50) {
		return STATUS.SHORT;
	}

	return STATUS.LONG; // If none of the above conditions, return status 'long'
}
