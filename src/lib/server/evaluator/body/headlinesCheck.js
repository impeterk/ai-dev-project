import { adjustHeadlinesData } from './adjustBodyData';
import { evaluateH1 } from './h1';
import { evaluateHx } from './hx';

/**
 * Evaluates the headlines found within a provided dataset.
 *
 * This function processes both main headlines ('h1') and sub-headlines ('h2' through 'h6') and applies the
 * respective evaluation functions on them. The results of these evaluations are then used to update
 * or generate records about the headlines' quality or structure.
 *
 * @param {Object} config - Configuration data, likely containing domain details, scan dates, and URL-specific identifiers.
 * @param {Array} data - The dataset containing all the headlines to be evaluated.
 * @param {string} type - The type/category of the issue, if any.
 * @param {string} key - Specific key or descriptor within the issue type.
 *
 * @returns {Promise<void>} - Resolves when all the headline evaluations are complete.
 *
 * Internal flow:
 * 1. Adjusts the provided dataset to match the format required for evaluation using `adjustHeadlinesData`.
 * 2. Iterates through each headline:
 *    a. For 'h1' headlines, it uses the `evaluateH1` function.
 *    b. For other headlines ('h2' through 'h6'), it uses the generalized `evaluateHx` function.
 * 3. Any unexpected headline type will trigger a warning in the console.
 * 4. All evaluations are run concurrently using promises, and the function awaits their completion.
 */
export function evaluateHeadlines(data, all) {
	const headlines = adjustHeadlinesData(data);
	let hxIssues = {};

	for (let headline of headlines) {
		let index = Object.keys(headline)[0];

		if (index == 'h1') {
			// run checks for h1
			hxIssues.h1 = evaluateH1(headline[index], all);
		} else {
			// run checks for rest of the headlines
			if (['h2', 'h3', 'h4', 'h5', 'h6'].includes(index)) {

				hxIssues[index] = evaluateHx(index, headline);
			} else {
				console.warn('Unknown value passed to evaluateHeadlines method.');
			}
		}
	}

	return hxIssues;
}
