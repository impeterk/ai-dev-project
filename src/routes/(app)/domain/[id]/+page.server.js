import { initiateScan } from '../../../../lib/server/scanner';
/**
 * Defines actions associated with scanning a domain and retrieving data from Google Search Console.
 *
 * The `startScan` action initiates the scanning process for a domain:
 * 1. Retrieves form data from the request.
 * 2. Extracts the domain ID, domain name, starting URL, and AI toggle settings from the form data.
 * 3. Sets the current timestamp as `dateOfScan` indicating the initiation time of the scan.
 * 4. Initiates the scanning process of the website using `initiateScan`. This involves
 *    crawling the website, scraping its data, storing the scraped data to the database, and subsequently evaluating the data.
 * The action returns immediately after initiating the scan without waiting for its completion.
 *
 * The `gsc` action retrieves data from Google Search Console for a domain:
 * 1. Retrieves form data from the request.
 * 2. Extracts the domain name and ID from the form data.
 * 3. Checks if the application has access to the Google Search Console property for the domain.
 * 4. If access is granted, gets the latest data from Google Search Console and returns it.
 * If an error occurs at any point in the function, it catches the error and returns a failure status and the error message.
 *
 * @param {Object} context - The context object contains request details.
 * @param {Object} context.request - The incoming request object.
 * @returns {Promise} - Resolves once the initiation of scanning process is complete, or rejects if there's an error.
 */
export const actions = {
	/**
	 * Initiates the scanning process for a domain.
	 *
	 * @param {Object} context.request - The incoming request object.
	 * @returns {Promise} - Resolves once the initiation of scanning process is complete, or rejects if there's an error.
	 */
	startScan: async ({ request }) => {
		let formData = await request.formData();
		let domainId = formData.get('domainid');
		let domainName = formData.get('domainName');
		let startingUrl = formData.get('startingUrl');
		let aiToggle = {
			all: formData.get('aiAll'),
			body: formData.get('aiBody'),
			meta: formData.get('aiMeta'),
			social: formData.get('aiSocial')
		};
		// creates a date when the scan started
		const dateOfScan = Date.now();

		// let startTime = Date.now();

		console.log('Form Data:');
		console.log(formData);

		initiateScan(domainId, dateOfScan, startingUrl, domainName, aiToggle);

		// Time Tracking
		// let endTime = Date.now();
		// console.log('Elapsed time: ');
		// console.log(((endTime - startTime) / 1000).toFixed(2));
	}
};
