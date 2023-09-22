import { isEmpty } from '../isEmpty';

/**
 * Evaluates the presence of a canonical tag value for a webpage.
 *
 * A canonical tag (rel="canonical") is used by webmasters to prevent duplicate content issues
 * in search engine optimization by specifying the "canonical" or "preferred" version of a web page.
 * This function checks whether a canonical tag value is provided or not.
 *
 * - 'ok': A canonical value is provided.
 * - 'missing': The canonical value is absent or an empty string.
 *
 * @param {string} value - The canonical tag value to be evaluated.
 * @returns {string} - A string indicating the evaluation result ('ok' or 'missing').
 */
export function evaluateCanonical(value) {
	if (isEmpty(value)) {
		return 'missing';
	} else {
		return 'ok';
	}
}
