import { firestore } from '$lib/firebase';
import { doc, collection, writeBatch } from 'firebase/firestore';

/**
 * Writes data to a Firestore collection in batches to handle Firestore's limitations on batch writes and document size.
 *
 * @param {Array} data - An array of data items to be written to Firestore. Each item represents a website's details.
 * @param {string} domain - The domain of the website.
 * @param {string} dateOfScan - The date when the website was scanned.
 * 
 * This function:
 * 1. Breaks the data into smaller batches to avoid exceeding Firestore's max batch size and max document size.
 * 2. Uses exponential backoff strategy for retries, handling 'RESOURCE_EXHAUSTED' error from Firestore by increasing delays.
 * 3. Reduces the delay for batch writes over time, to speed up the process as it progresses.
 * 4. Skips documents that exceed Firestore's document size limit and logs a warning for them.
 * 5. Writes the data to Firestore under the path: `domain/{domain}/dateofscan/{dateOfScan}/scannedurls/{slug}`
 *    where 'slug' is derived from the URL of the website.
 */
export async function writeDataInBatches(data, domain, dateOfScan) {
    const MAX_BATCH_SIZE = 5;  // Reduced from 10 for better throttling
    const MAX_DOC_SIZE = 1048576;
    const MAX_BATCH_DOC_SIZE = 10 * 1024 * 1024;

    let INITIAL_BATCH_DELAY = 10000;  // Increased from 2000 to provide a more conservative starting point
    const MINIMUM_BATCH_DELAY = 2000;  // This is the least delay you would want to go to.
    const RAMP_DOWN_PERCENTAGE = 0.75;  // Reducing delay by 25% instead of 50%
    const MAX_RETRIES = 5;  // For handling the RESOURCE_EXHAUSTED error

    let currentBatchSize = 0;
    let batch = writeBatch(firestore);
    let opsCount = 0;

    for (let item of data) {
        const itemSize = new Blob([JSON.stringify(item)]).size;
        if (itemSize > MAX_DOC_SIZE) {
            console.warn(`Skipped a document due to size limit. URL: ${item.url}`);
            continue;
        }

        if (currentBatchSize + itemSize > MAX_BATCH_DOC_SIZE || opsCount >= MAX_BATCH_SIZE) {
            let retries = 0;

            while (retries < MAX_RETRIES) {
                try {
                    await batch.commit();
                    break;  // If commit is successful, break out of the retry loop.
                } catch (error) {
                    if (error.code === 'resource-exhausted') {
                        // Increase delay and try again.
                        INITIAL_BATCH_DELAY *= 1.5;
                        console.warn(`Resource exhausted. Increasing delay to ${INITIAL_BATCH_DELAY}ms and retrying.`);
                        retries++;
                        await new Promise(resolve => setTimeout(resolve, INITIAL_BATCH_DELAY));
                    } else {
                        throw error;  // If error is of different type, throw it.
                    }
                }
            }

            if (retries === MAX_RETRIES) {
                console.error('Max retries reached. Please check your Firestore limits.');
                throw new Error('Max retries reached.');
            }

            // After a successful batch commit, we can consider ramping down the delay.
            if (INITIAL_BATCH_DELAY > MINIMUM_BATCH_DELAY) {
                INITIAL_BATCH_DELAY *= RAMP_DOWN_PERCENTAGE;
            }

            await new Promise(resolve => setTimeout(resolve, INITIAL_BATCH_DELAY));

            batch = writeBatch(firestore);
            opsCount = 0;
            currentBatchSize = 0;
        }

        let slug = item.url.split('/').at(-1);
        if (slug == '') slug = 'home';
        const docRef = doc(collection(firestore, `domain/${domain}/dateofscan/${dateOfScan}/scannedurls/`));

        batch.set(docRef, {
            url: item.url,
            slug,
            meta: item.scrappedData.meta,
            body: item.scrappedData.body,
            social: item.scrappedData.social,
            schema: item.scrappedData.schema,
            date: Date.now()
            // allData: item.allData
        });

        currentBatchSize += itemSize;
        opsCount++;
    }

    if (opsCount > 0) {
        await batch.commit();
    }
}
