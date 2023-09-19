import { firestore } from '$lib/firebase';
import { doc, collection, writeBatch } from 'firebase/firestore';

/**
 * Writes data to Firebase Firestore in batches to avoid:
 * 1. Hitting write rate limits
 * 2. Single document size limits.
 * 
 * @async
 * @function
 * 
 * @param {Array} data - Array of data items to be written to Firestore.
 * @param {string} domain - The domain associated with the data.
 * @param {number} dateOfScan - Timestamp indicating when the scan was initiated.
 * 
 * @returns {void} No return value, but the function will throw if any Firestore write operation fails.
 */
export async function writeDataInBatches(data, domain, dateOfScan) {
	// Constants defining maximum sizes and delay for batching
	const MAX_BATCH_SIZE = 2; // Maximum number of docs in one batch
	const MAX_DOC_SIZE = 1048576; // 1 MiB in bytes: Maximum allowed size for one document
	const MAX_BATCH_DOC_SIZE = 10 * 1024 * 1024; // 10 MiB in bytes: Maximum allowed combined size of batch
    const BATCH_DELAY = 2000; // 2 seconds delay between batches

	let currentBatchSize = 0;
	let batch = writeBatch(firestore);
	let opsCount = 0;

	for (let item of data) {
		// Calculate the size of the item in bytes
		const itemSize = new Blob([JSON.stringify(item)]).size;

		// Skip items that are larger than Firestore's max document size
		if (itemSize > MAX_DOC_SIZE) {
			console.warn(`Skipped a document due to size limit. URL: ${item.url}`);
			continue;
		}
		 // If adding the current item would exceed the batch size or document count limits, commit the current batch
		if (currentBatchSize + itemSize > MAX_BATCH_DOC_SIZE || opsCount >= MAX_BATCH_SIZE) {
			await batch.commit();
			await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY)); // Add a delay
			batch = writeBatch(firestore); // Create a new batch after committing the previous one
			opsCount = 0;
			currentBatchSize = 0;
		}

		// Define a 'slug' for the document based on the last segment of the URL
		let slug = item.url.split('/').at(-1);
		if (slug == '') slug = 'home';
		const docRef = doc(
			collection(firestore, `domain/${domain}/dateofscan/${dateOfScan}/scannedurls/`)
		);

		// Add the item to the current batch
		batch.set(docRef, {
			url: item.url,
			slug,
			meta: item.scrappedData.meta,
			body: item.scrappedData.body,
			social: item.scrappedData.social,
			schema: item.scrappedData.schema,
			allData: item.allData
		});

		currentBatchSize += itemSize;
		opsCount++;
	}

	// Commit any remaining writes in the current batch
	if (opsCount > 0) {
		await batch.commit();
	}
}
