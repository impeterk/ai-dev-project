import { isEmpty } from '../isEmpty';
import { isUnique } from '../isUnique';

/**
 * Evaluates the content of a specific type of headline (like h2, h3, etc.) and determines its status.
 *
 * Given a type of headline (referred to by index), this function:
 * 1. Checks if the content of the headline is not empty.
 * 2. Validates if the entries within the headline are unique.
 *
 * @param {string} index - The type of headline being evaluated (e.g., 'h2', 'h3', etc.).
 * @param {Object} headline - The specific headline object containing arrays of headlines for different types.
 * @returns {string} - Returns 'ok' if the headline content is unique, 'duplicates' if there are non-unique entries, or an empty string if the headline content is empty.
 */
export function evaluateHx(index, headline) {
	if (!isEmpty(headline[index])) {
		return isUnique(headline[index]) ? 'ok' : 'duplicates';
	} else {
		return '';
	}
}
