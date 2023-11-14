import { isEmpty } from '../isEmpty';
import { isDuplicate } from '../isUnique';
import { STATUS } from '../config';

/**
 * Evaluates the length and presence of a given webpage description.
 *
 * This function assesses a webpage description (typically the meta description) based on its length.
 * The description is categorized as:
 * - 'ok': if its length is between 150 and 159 characters inclusive.
 * - 'short': if its length is less than 150 characters.
 * - 'long': if its length is 160 characters or more.
 * - 'missing': if the description is absent or an empty string.
 *
 * The categorization follows SEO (Search Engine Optimization) best practices,
 * where descriptions between 150-160 characters are generally seen as optimal for most search engines,
 * ensuring that the description isn't truncated in search results.
 *
 * @param {string} value - The webpage description to be evaluated.
 * @param {Array} all - Data set used for duplication check.
 * @returns {string} - A string indicating the evaluation result ('ok', 'short', 'long', or 'missing').
 */
export function evaluateDescription(value, all) {
	if (isEmpty(value)) {
		return STATUS.MISSING;
	}

	if (isDuplicate('description', value, all)) {
		return STATUS.DUPLICATE;
	}

	if (value.length >= 150 && value.length < 160) {
		return STATUS.OK;
	}

	if (value.length < 150) {
		return STATUS.SHORT;
	}

	return STATUS.LONG; // If none of the above conditions, it must be long.
}
