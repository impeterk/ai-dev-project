import { firestore } from './index';
import { doc, updateDoc } from 'firebase/firestore';

/**
 * Updates a specific document in a Firestore collection.
 *
 * @param {string} domain - The domain of the website.
 * @param {string} dateOfScan - The date when the website was scanned.
 * @param {string} urlId - The ID of the URL within the scanned website.
 * @param {string} type - The type/category of the issue.
 * @param {string} key - The specific key within the issue type.
 * @param {Object|string|Array} data - The data to update in the document. It can be a string, array, or object.
 * @param {boolean} isObject - Flag to check if 'data' is an object (default is false).
 *
 * If 'isObject' is true, the function updates the Firestore document with a nested object using the key from the 'data' object.
 * Otherwise, it updates the Firestore document with the provided 'data'.
 *
 * Example Firestore document path:
 * `domain/{domain}/dateofscan/{dateOfScan}/scannedurls/{urlId}`
 *
 * Usage:
 * 1) When 'isObject' is false (default): -> used for strings / numbers such as title, description, etc...
 * - The Firestore path will be updated with `issues.{type}.{key}`: data
 *
 * 2) When 'isObject' is true:
 * - The Firestore path will be updated with `issues.{type}.{key}.{index}`: data[index],
 * where 'index' is the key extracted from the 'data' object. This is used for instance for headlines
 */
export async function updateIssueDocument(
	domain,
	dateOfScan,
	urlId,
	type,
	key,
	data,
	isObject = false
) {
	const pathToUrlUpdate = `domain/${domain}/dateofscan/${dateOfScan}/scannedurls/${urlId}`;
	let pathToIssueUpdate = key ? `issues.${type}.${key}` : `issues.${type}`;

	if (isObject == false) {
		await updateDoc(doc(firestore, pathToUrlUpdate), {
			[pathToIssueUpdate]: data
		});
	} else if (isObject == true) {
		let index = Object.keys(data)[0];
		pathToIssueUpdate += `.${index}`;

		await updateDoc(doc(firestore, pathToUrlUpdate), {
			[pathToIssueUpdate]: data[index]
		});
	}
}
