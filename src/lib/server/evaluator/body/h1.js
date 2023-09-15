import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

/**
 * Evaluates the H1 header(s) of a webpage and updates the corresponding issue document.
 *
 * This function checks the H1 data and determines its status (ok, multiple, or missing).
 * - It first removes whitespace from the first H1 to get its effective length.
 * - If there's exactly one non-empty H1, it updates the status to 'ok'.
 * - If there are multiple H1 headers, it updates the status to 'multiple'.
 * - If the H1 is empty or not provided (empty array), it updates the status to 'missing'.
 * The evaluation results are then stored in a Firebase collection using the `updateIssueDocument` method.
 *
 * @param {Object} config - The configuration object containing domain, date of scan, and URL ID.
 * @param {string} type - The type of data being processed.
 * @param {string} key - The key to use when updating the Firebase document.
 * @param {Array<string>} data - An array containing the H1 header(s) data.
 * @returns {Promise<void>} - Resolves when the update operation to Firebase completes.
 */
export async function evaluateH1(config, type, key, data) {
	let h1Status = 'missing'; // default value

	if (!isEmpty(data) && !isEmpty(data[0])) {
		// const h1Length = data[0].replace(/\s+/g, '').length; // without whitespaces

		if (data.length === 1) {
			h1Status = 'ok';
		} else if (data.length > 1) {
			h1Status = 'multiple';
		} else if (h1Length === 0 || data.length < 1) {
			h1Status = 'missing';
		}
	}

	await updateIssueDocument(config.domain, config.dateOfScan, config.urlId, type, key, {
		h1: h1Status
	}, true);
}
