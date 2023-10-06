// Crawlee crawler logic
import { CheerioCrawler } from 'crawlee';
import { Actor } from 'apify';
import { scrapAllData } from '../scrapper';
import { getConfig } from './config';
import { isValid } from './isValid';
import { removeDuplicates } from './removeDuplicates';

/**
 * Initiates a web crawler using CheerioCrawler on a specified domain.
 *
 * The function begins by fetching the appropriate configuration for the crawler
 * and initializing the Apify actor. It sets up a unique request queue and dataset
 * for the domain to be crawled. The CheerioCrawler is then used to crawl the website
 * by processing each page and enqueuing relevant links while excluding those with parameters.
 *
 * For each page, the function checks the validity of its URL and pushes the scraped data
 * to the dataset only if the URL is valid. After completing the crawl, the function filters
 * out any duplicate entries from the dataset before returning it.
 *
 * @param {string} domain - The starting domain or URL to be crawled.
 * @returns {Promise<Object>} - A promise that resolves to a dataset containing unique scraped data and URLs.
 * @throws {Error} - Throws an error if any issue arises during the crawling process.
 */
export async function initiateCrawler(domain) {
	try {
		// Get a config for the crawler
		let config = getConfig(domain);

		// Initialize the Apify actor
		await Actor.init();

		// Create new named queue and new named dataset
		const requestQueue = await Actor.openRequestQueue(config.queueName);
		const requestDataset = await Actor.openDataset(config.datasetName);

		// Init crawler
		const crawler = new CheerioCrawler({
			requestQueue, // passing the new unique queue

			// Use the requestHandler to process each of the crawled pages.
			async requestHandler({ request, $, enqueueLinks }) {
				// Extract links from the current page and add them to the crawling queue if they match the pattern
				await enqueueLinks({
					globs: config.domainPattern,
					exclude: ['*?*'],
					transformRequestFunction(req) {
						return isValid(req, domain); // Passing domain as an argument
					}
				});

				// Only push the data to dataset if the URL is valid
				if (isValid(request, domain)) {
					requestDataset.pushData({
						url: request.loadedUrl,
						scrappedData: scrapAllData($)
					});
				}
			}
		});

		// Add first URL to the queue and start the crawl.
		await crawler.run([domain]);

		// Finally return the filtered dataset
		return await removeDuplicates(requestDataset);
	} catch (error) {
		console.error('Error occurred while crawling:', error);
		throw error;
	}
}
