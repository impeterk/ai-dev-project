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

/**
 * Retrieves a specific document from Firebase Firestore based on provided domain and date of scan.
 *
 * The Firestore document structure is expected to be: `domain/<domain>/dateofscan/<dateOfScan>`.
 *
 * The function performs the following steps:
 * 1. Validates that both `domain` and `dateOfScan` are provided.
 * 2. Attempts to fetch the specified document from Firestore.
 * 3. Throws an error if the document does not exist or if there's a problem during retrieval.
 * 4. If successful, returns the data contained in the Firestore document.
 *
 * @param {string} domain - The domain associated with the Firestore document.
 * @param {string} dateOfScan - The date of scan associated with the Firestore document.
 * @returns {Promise<Object>} Returns a Promise that resolves with the data from the Firestore document.
 * @throws Will throw an error if `domain` or `dateOfScan` are not provided, if there's an issue fetching data from Firestore, or if the document doesn't exist.
 */
export async function getDataForDuplicateCheck(domain, dateOfScan) {
	if (!domain || !dateOfScan) {
		throw new Error(
			'Both domain: ' +
				domain +
				' and dateOfScan: ' +
				dateOfScan +
				' are required and should be valid.'
		);
	}

	let documentSnapshot;
	try {
		const documentRef = doc(firestore, `domain/${domain}/dateofscan/${dateOfScan}`);
		documentSnapshot = await getDoc(documentRef);
	} catch (error) {
		throw new Error('Failed to fetch data from Firestore: ' + error.message);
	}

	if (!documentSnapshot.exists()) {
		throw new Error('Document does not exist');
	}

	return documentSnapshot.data().all;
}
