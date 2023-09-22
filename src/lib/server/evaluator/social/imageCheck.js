import { isEmpty } from '../isEmpty';

/**
 * Evaluates the presence of an image value and categorizes it as 'ok' or 'missing'.
 *
 * This function checks if the given image value is present:
 * - 'ok': If the image value is non-null, non-undefined, and not an empty string.
 * - 'missing': If the image value is null, undefined, or an empty string.
 *
 * @param {string} value - The image value to be evaluated.
 * @returns {string} - The status of the image's presence ('ok' or 'missing').
 */
export function evaluateImage(value) {
	if (!isEmpty(value)) {
		return 'ok';
	} else {
		return 'missing';
	}
}
