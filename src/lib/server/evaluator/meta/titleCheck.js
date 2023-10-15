import { isEmpty } from '../isEmpty';
import { isDuplicate } from '../isUnique';

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
 * @returns {string} - A string indicating the assessment result ('ok', 'short', 'long', or 'missing').
 */
export function evaluateTitle(value, all) {
	if (!isEmpty(value)) {
		if (isDuplicate('title', value, all)) {
			return 'duplicate';
		} else if (value.length >= 50 && value.length < 60) {
			return 'ok';
		} else if (value.length < 50) {
			return 'short';
		} else if (value.length >= 60) {
			return 'long';
		}
	} else {
		return 'missing';
	}
}
