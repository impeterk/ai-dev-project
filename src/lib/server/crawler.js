// Crawlee crawler logic
import { CheerioCrawler, Dataset } from 'crawlee';
// Import the Apify SDK into your project
import { Actor } from 'apify';
import {scrapAllData} from "./scrapper";

export async function initiateCrawler(domain) {
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
			// Save results as JSON to ./storage/datasets/default
			await requestDataset.pushData({ url: request.loadedUrl, data: scrapAllData($) });

			// Extract links from the current page and add them to the crawling queue
			await enqueueLinks();
		}
	});

	// Add first URL to the queue and start the crawl.
	await crawler.run([domain]);

	// Finally return the list of urls
	return requestDataset.getData();
}

// Helper method to get the unique named data for queue & dataset
function getConfig(domain) {
	let timeStamp = new Date().getTime().toString();

	return {
		queueName: domain + '-' + timeStamp + '-' + 'queue',
		datasetName: domain + '-' + timeStamp + '-' + 'dataset'
	};
}
