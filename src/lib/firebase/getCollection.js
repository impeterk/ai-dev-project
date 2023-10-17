import { firestore } from './index';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

/**
 * Retrieves scanned URLs for a given domain and scan date collection from Firestore.
 *
 * @param {string} domain - The domain for which the scanned URLs should be fetched.
 * @param {string} dateOfScan - The date of the scan for which the URLs should be fetched.
 * @returns {Object} - An object where each key is a URL id from Firestore and its value is the associated data.
 * @throws {Error} - Throws an error if the Firestore call fails.
 */
export async function getScanCollection(domain, dateOfScan) {
	if (!domain || !dateOfScan) {
		throw new Error(
			'Both domain: ' +
				domain +
				' and dateOfScan: ' +
				dateOfScan +
				' are required and should be valid.'
		);
	}

	let query;
	try {
		query = await getDocs(
			collection(firestore, `domain/${domain}/dateofscan/${dateOfScan}/scannedurls`)
		);
	} catch (error) {
		throw new Error('Failed to fetch data from Firestore: ' + error.message);
	}

	// Data object to be populated in loop and returned once done
	const pageData = {};

	// Add items in key-value pair format where key is the URL id from Firestore and value is Firestore's data related to the URL
	query.forEach((url) => {
		pageData[url.id] = url.data();
	});

	return pageData;
}
