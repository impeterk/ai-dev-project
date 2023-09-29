import { initiateScan } from '../../../../lib/server/scanner';

/**
 * Defines actions associated with scanning a domain.
 * 
 * The primary action is the default action which:
 * 1. Retrieves form data from the request.
 * 2. Extracts the 'domainid' from the form data and constructs a URL (`rescanDomain`) based on it.
 * 3. Sets the current timestamp as `dateOfScan` indicating the initiation time of the scan.
 * 4. Initiates the scanning process of the website using `initiateScan`. This involves 
 *    crawling the website, scraping its data, storing the scraped data to the database, and subsequently evaluating the data.
 * 
 * The action returns immediately after initiating the scan without waiting for its completion.
 * 
 * (Note: There's commented-out code that potentially can be used for time tracking purposes, to measure the elapsed time of the scan. 
 * This is currently not active in the function.)
 * 
 * @param {Object} context - The context object contains request details.
 * @param {Object} context.request - The incoming request object.
 * @returns {Promise} - Resolves once the initiation of scanning process is complete, or rejects if there's an error.
 */
export const actions = {
	default: async ({ request }) => {
		let formData = await request.formData();
		let domainId = formData.get('domainid');
		let startingUrl = formData.get('startingUrl')
		// creates a date when the scan started
		const dateOfScan = Date.now();

		// let startTime = Date.now();

		initiateScan(domainId, dateOfScan, startingUrl);

		// Time Tracking
		// let endTime = Date.now();
		// console.log('Elapsed time: ');
		// console.log(((endTime - startTime) / 1000).toFixed(2));
	}
};
