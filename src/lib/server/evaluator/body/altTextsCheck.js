/**
 * Evaluates the alt attribute of an image based on its presence and uniqueness.
 *
 * This function performs a thorough check on the provided alt attribute value. It uses
 * previously defined helper functions `isEmpty` and `isDuplicate` to determine the status of
 * the alt value. The function checks in the following order:
 *
 * 1. If the alt value is empty or not provided, it returns 'missing'.
 * 2. If the alt value is not unique among the given dataset, it returns 'duplicate'.
 * 3. If the alt value is both present and unique, it returns 'ok'.
 *
 * The uniqueness check searches for duplicates in the provided dataset (`all`) based on the 'alt' property.
 *
 * @param {string} value - The alt attribute value to evaluate.
 * @param {Array} all - An array of datasets where each dataset is expected to have an 'alt' property.
 *
 * @returns {string} Returns one of the following strings based on evaluation: 'duplicate', 'ok', or 'missing'.
 */

import { isEmpty } from '../isEmpty';
import { isDuplicate } from '../isUnique';

export function evaluateAlts(value, all) {
	if (!isEmpty(value)) {
		if (isDuplicate('alt', value, all)) {
			return 'duplicate';
		} else {
			return 'ok';
		}
	} else {
		return 'missing';
	}
}
