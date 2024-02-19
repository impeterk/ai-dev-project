
import { updateDomain, updateQueue } from '../../firebase/updateStatus';
import { writeDataInBatches } from '../../firebase/addCollection';
import { firestore } from '$lib/firebase';
import { doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';

import { hasAccess } from '../../gapi/utils';

import { initiateCrawler } from '../crawler';
import { initiateEvaluation } from '../evaluator';
import { initiateSuggestions } from '../ai';
import { extractDataFromDataset } from '../../utils/extractData';
import { checkQueue } from '../scanQueue';

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
export async function initiateScan(domain, dateOfScan, startingUrl, domainName, aiToggle) {
	const gsc = await hasAccess('https://' + domainName);
	let queueItemId = await updateQueue(dateOfScan)
	// Add a new entry into the database
	await updateDomain(domain, { status: 'scanning', lastScan: dateOfScan, gscAccess: gsc });
	const docRef = doc(firestore, `domain/${domain}/dateofscan/${dateOfScan}`)
	// Check if the application has acces to Google Search Console Data
	// Add a new entry into the database
	await setDoc(doc(firestore, `domain/${domain}/dateofscan/${dateOfScan}`), {
		date: dateOfScan,
		startingUrl
	});

	try {
		await initiateCrawler(startingUrl)
			.then(async (result) => {
				await writeDataInBatches(result.items, domain, dateOfScan);

				// Manipulate the data for duplicity check in Evaluation phase
				const all = extractDataFromDataset(result.items);

				await updateDomain(domain, { status: 'evaluating' });
				// updates total pages scanned to the database
				await updateDoc(docRef, {
					totalPages: result.items.length
				})
				return all;
			})
			.then(async (all) => {
				await initiateEvaluation(domain, dateOfScan, all);
				await updateDomain(domain, { status: 'ai magic' });

			})
			.then(async () => {
				await initiateSuggestions(domain, dateOfScan, aiToggle);
			})
			.then(async () => {
				console.log('Scan completely finished');
				await updateDomain(domain, { status: 'finished' });
			})
	} catch (error) {
		console.error('Error during initiateScan:', error);
		await updateDomain(domain, { status: 'aborted' });
	} finally {
		// removes entry from queue and checks queue again
		return await deleteDoc(doc(firestore, 'queue', queueItemId)).then(() => {
			checkQueue()
		})
		.then(async (all) => {
			await initiateEvaluation(domain, dateOfScan, all);
			await updateDomain(domain, { status: 'ai magic' });
		})
		.then(async () => {
			await initiateSuggestions(domain, dateOfScan, aiToggle);
		})
		.then(async () => {
			console.log('Scan completely finished');
			await updateDomain(domain, { status: 'finished' });
		})
		.catch(async (error) => {
			console.error('Error during initiateScan:', error);
			await updateDomain(domain, { status: 'aborted' });
		});
}
