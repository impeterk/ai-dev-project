import { isEmpty } from '../isEmpty';

/**
 * Evaluates the presence of alternate tags (often used for specifying alternate languages) for a webpage.
 *
 * Alternate tags, specified using the "rel" attribute with a value of "alternate", are often
 * used to indicate alternate versions of a page, especially in the context of multi-language websites.
 * This function checks whether an alternate tag value is provided or not.
 *
 * - 'ok': An alternate tag value is provided.
 * - 'missing': The alternate tag value is absent or an empty string.
 *
 * @param {string} value - The alternate tag value to be evaluated.
 * @returns {string} - A string indicating the evaluation result ('ok' or 'missing').
 */
export function evaluateAlternates(value) {
	if (!isEmpty(value)) {
		return 'ok';
	} else {
		return 'missing';
	}
}
