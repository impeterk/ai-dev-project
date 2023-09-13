import { firestore } from './index';
import { collection, getDocs } from 'firebase/firestore';

export async function getScanCollection(domain, dateOfScan) {
	const query = await getDocs(
		collection(firestore, `domain/${domain}/dateofscan/${dateOfScan}/scannedurls`)
	);

	// // Data object to be populated in loop and returned once done
	let pageData = {};

	// Add items in key-value pair format wher key is the URL id from firebase and value is fireba's data related to url
	query.forEach((url) => {
		pageData[url.id] = url.data();
	});

	return pageData;
}
