// Crawlee crawler logic
import { CheerioCrawler, Dataset } from 'crawlee';

export async function initiateCrawler(domain) {
	// let list = [];
	
	// CheerioCrawler crawls the web using HTTP requests
	// and parses HTML using the Cheerio library.
	const crawler = new CheerioCrawler({
		// Use the requestHandler to process each of the crawled pages.
		async requestHandler({ request, enqueueLinks }) {
			// Save results as JSON to ./storage/datasets/default
			await Dataset.pushData({ url: request.loadedUrl });
			// list.push(request.loadedUrl);

			// Extract links from the current page
			// and add them to the crawling queue
			await enqueueLinks();
		}
	});

	// Add first URL to the queue and start the crawl.
	await crawler.run([domain]);

	// Finally return the list of urls
	return Dataset.getData();
	// return list;
}
