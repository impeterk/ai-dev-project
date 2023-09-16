import { initiateCrawler } from '../crawler';
import { initiateEvaluation } from '../evaluator';
import { adjustDomain } from '../scanner/adjustDomain';
import { updateStatus } from '../../firebase/updateStatus';
import { firestore } from '$lib/firebase';
import { doc, setDoc, addDoc, collection, updateDoc } from 'firebase/firestore';

/**
 * Initiates a scanning process for a given domain.
 *
 * The function performs the following steps:
 * 1. Adjusts the domain format using `adjustDomain`.
 * 2. Updates the status in the database to 'scanning'.
 * 3. Records the starting URL for the scan in the database.
 * 4. Initiates a web crawling process using `initiateCrawler` to fetch and scrape URLs associated with the domain.
 * 5. For each scraped result:
 *    a. Determines a unique 'slug' based on the URL's last segment.
 *    b. Stores the scraped data (meta, body, social, schema, and allData) in the database.
 * 6. Updates the total number of scanned pages in the database.
 * 7. Updates the status to 'finished' once the crawling process is complete.
 * 8. Updates the status to 'evaluating' and initiates the evaluation process using `initiateEvaluation`.
 * 9. Updates the status to 'finished' once the evaluation process is complete.
 *
 * In case of any error during the scanning or evaluation, the status is set to 'aborted'.
 *
 * @param {string} domain - The domain to be scanned.
 * @param {number} dateOfScan - The timestamp indicating when the scan was initiated.
 * @param {string} [startingUrl=domain] - The URL from where the crawling should start. Defaults to the domain.
 * @returns {Promise} - Resolves when the scanning and evaluation process is complete, or rejects if there's an error.
 */
export async function initiateScan(domain, dateOfScan, startingUrl = domain) {
	domain = adjustDomain(domain);

	// add new entry into Data base
	await updateStatus(domain, 'scanning');
	await setDoc(doc(firestore, `domain/${domain}/dateofscan/${dateOfScan}`), {
		startinguUrl: startingUrl
	});

	// starts crawling & scrapping urls
	await initiateCrawler(startingUrl)
		.then(async (result) => {
			//writes crawl & scrap results to database
			result.items.map((item) => {
				let slug = item.url.split('/').at(-1);
				if (slug == '') slug = 'home';
				addDoc(collection(firestore, `domain/${domain}/dateofscan/${dateOfScan}/scannedurls/`), {
					url: item.url,
					slug,
					meta: item.scrappedData.meta,
					body: item.scrappedData.body,
					social: item.scrappedData.social,
					schema: item.scrappedData.schema,
					allData: item.allData
				});
			});

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
		.catch(async () => {
			// in case of error, changes status to aborted
			await updateStatus(domain, 'aborted');
		});
}
