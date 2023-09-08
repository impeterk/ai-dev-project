// Crawlee crawler logic
import { CheerioCrawler, Dataset } from 'crawlee';
// Import the Apify SDK into your project
import { Actor } from 'apify';
import { scrapAllData } from './scrapper';
import { firestore } from '$lib/firebase'
import { doc, setDoc, collection, updateDoc } from "firebase/firestore"
/**
 * Initiates the web crawler using CheerioCrawler.
 *
 * This function sets up and runs the CheerioCrawler to crawl website
 * from a given domain. It also uses Apify's actor system for managing
 * the request queue and dataset. For each crawled website it runs an
 * instance of the scrapper to retrieve page's data.
 * After processing, it stores the scraped data alongside the URL in the dataset.
 *
 * @param {string} domain - The starting URL/domain to crawl.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of objects containing scraped data and URLs.
 */
export async function initiateCrawler(domain, dateOfScan) {
	// add new entry into Data base
	// TODO connect to front end.
	let newEntry = domain.replace("https://", '')
	let docRef = doc(firestore, `domain/${newEntry}`)
	await updateDoc(docRef, { status: "scanning" })
	//const dateOfScan = Date.now()
	await setDoc(doc(firestore, `domain/${newEntry}/dateofscan/${dateOfScan}`), {})
	// Get a config for the crawler
	let config = getConfig(domain);

	// Initialize the Apify actor
	await Actor.init();

	// Create new named queue and new named dataset
	const requestQueue = await Actor.openRequestQueue(config.queueName);
	const requestDataset = await Actor.openDataset(config.datasetName);

	// CheerioCrawler crawls the web using HTTP requests
	const crawler = new CheerioCrawler({
		requestQueue, // passing the new unique queue

		// Use the requestHandler to process each of the crawled pages.
		async requestHandler({ request, $, enqueueLinks }) {
			requestDataset.pushData({ url: request.loadedUrl, data: scrapAllData($) });


			// Extract links from the current page and add them to the crawling queue if they match the pattern
			await enqueueLinks({ globs: config.domainPattern });
		}
	});

	// Add first URL to the queue and start the crawl.
	await crawler.run([domain]);

	// Finally return the list of urls
	let scrapedData = await requestDataset.getData()
	scrapedData.items.map(item => {
		let slug = item.url.split("/").at(-1)
		if (slug == '') slug = "home"
		setDoc(doc(firestore, `domain/${newEntry}/dateofscan/${dateOfScan}/scannedurls/${slug}`), {
			meta: item.data.meta,
			social: item.data.social,
			headlines: item.data.body.headlines,
			images: item.data.body.images
		})
	})
	await updateDoc(docRef, { status: "finished" })

}

/**
 * Generates a configuration object for the crawler based on the provided domain.
 *
 * This helper function creates unique names for the request queue and dataset,
 * ensuring that each crawl session has its distinct queue & dataset. It also constructs
 * a domain-specific pattern for URLs that should be enqueued by the crawler.
 *
 * @param {string} domain - The base domain for which the configuration should be created.
 * @returns {Object} - An object containing the queue name, dataset name, and domain pattern.
 */
function getConfig(domain) {
	let timeStamp = new Date().getTime().toString();

	return {
		queueName: domain + '-' + timeStamp + '-' + 'queue',
		datasetName: domain + '-' + timeStamp + '-' + 'dataset',
		domainPattern: [`${domain}/**`]
	};
}
