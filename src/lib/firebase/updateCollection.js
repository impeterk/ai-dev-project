import { firestore } from './index';
import { doc, updateDoc } from 'firebase/firestore';

/**
 * Asynchronously updates the 'issues' field of a specific document in a Firestore collection based on the provided configuration.
 *
 * @param {Object} config - Configuration object with the following properties:
 *    @property {string} domain - The domain of the website.
 *    @property {string} dateOfScan - The date when the website was scanned.
 *    @property {string} urlId - The unique ID associated with a specific URL within the scanned website.
 * @param {Object|string|Array} data - The data intended to update the 'issues' field in the Firestore document. This can be a string, array, or object.
 * Note: Ensure the format of 'data' aligns with the structure expected in the 'issues' field.
 *
 * The function constructs a Firestore document path in the format:
 * `domain/{domain}/dateofscan/{dateOfScan}/scannedurls/{urlId}`
 * and updates the specified document's 'issues' field with the provided data.
 */

export async function updateIssueDocument(config, data) {
	const pathToUrlUpdate = `domain/${config.domain}/dateofscan/${config.dateOfScan}/scannedurls/${config.urlId}`;

	await updateDoc(doc(firestore, pathToUrlUpdate), {
		issues: data
	});
}

/**
 * Asynchronously updates the 'suggestions' field of a specific document in a Firestore collection based on the provided configuration.
 *
 * @param {Object} config - Configuration object with the following properties:
 *    @property {string} domain - The domain of the website.
 *    @property {string} dateOfScan - The date when the website was scanned.
 *    @property {string} urlId - The unique ID associated with a specific URL within the scanned website.
 * @param {Object|string|Array} data - The data intended to update the 'suggestions' field in the Firestore document. This can be a string, array, or object.
 * Note: Ensure the format of 'data' aligns with the structure expected in the 'suggestions' field.
 *
 * The function constructs a Firestore document path in the format:
 * `domain/{domain}/dateofscan/{dateOfScan}/scannedurls/{urlId}`
 * and updates the specified document's 'suggestions' field with the provided data.
 */
export async function updateSuggestionDocument(config, data) {
	const pathToUrlUpdate = `domain/${config.domain}/dateofscan/${config.dateOfScan}/scannedurls/${config.urlId}`;

	await updateDoc(doc(firestore, pathToUrlUpdate), {
		suggestions: data
	});
}
