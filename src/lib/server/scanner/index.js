import { initiateCrawler } from '../crawler';
import { initiateEvaluation } from '../evaluator';
import { adjustDomain } from '../scanner/adjustDomain';
import { updateStatus } from '../../firebase/updateStatus';
import { writeDataInBatches } from '../../firebase/addCollection';

import { firestore } from '$lib/firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

/**
 * Initiates the scanning process for a given domain.
 * The process consists of several steps:
 * 1. Adjust the domain to a standardized format.
 * 2. Update the scanning status for the domain in the database.
 * 3. Crawl and scrape the content starting from a provided URL (or the domain if no starting URL is provided).
 * 4. Store the scraped data in the database in batches to avoid exceeding write limits.
 * 5. Update the number of total pages scanned for the domain.
 * 6. Initiate an evaluation process for the domain.
 * 7. Once the evaluation is done, update the status to 'finished'.
 *
 * If any error occurs during these steps, the status for the domain is updated to 'aborted'.
 *
 * @async
 * @function
 *
 * @param {string} domain - The domain to scan. It will also be used as the starting URL if no separate starting URL is provided.
 * @param {number} dateOfScan - Timestamp indicating when the scan was initiated.
 * @param {string} [startingUrl=domain] - The URL from where to begin the crawl and scrape. Defaults to the domain.
 *
 * @returns {Promise<void>} Resolves once all scanning, scraping, storing, and evaluation processes are done or an error occurs.
 */
export async function initiateScan(domain, dateOfScan, startingUrl = domain) {
	domain = adjustDomain(domain);

	// Add a new entry into the database
	await updateStatus(domain, 'scanning');
	await setDoc(doc(firestore, `domain/${domain}/dateofscan/${dateOfScan}`), {
		startinguUrl: startingUrl
	});

	// Start crawling, scrapping, DB store and evaluation of URLs
	await initiateCrawler(startingUrl)
		.then(async (result) => {
			await writeDataInBatches(result.items, domain, dateOfScan);

			await updateDoc(doc(firestore, `domain/${domain}/dateofscan/${dateOfScan}`), {
				totalPages: result.items.length
			});
		})
		.then(async () => {
			await updateStatus(domain, 'evaluating');
		})
		.then(async () => {
			await initiateEvaluation(domain, dateOfScan);
		})
		.then(async () => {
			await updateStatus(domain, 'finished');
		})
		.catch(async (error) => {
			console.error('Error during initiateScan:', error);
			await updateStatus(domain, 'aborted');
		});
}
