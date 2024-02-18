import { initiateScan } from '../../../../lib/server/scanner';
import { hasAccess } from '../../../../lib/gapi/utils.js';
import { getData } from '../../../../lib/gapi/getData.js';

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
	},

	gsc: async ({ request }) => {
		let formData = await request.formData();
		let domainName = formData.get('domainName');
		let domainId = formData.get('domainId');
		domainName = 'https://' + domainName;
		// 0. Check if application has access to GSC property
		if (await hasAccess(domainName)) {
			// 1. TBD Try to get the GSC data from Firebase first (stored on domain level) 
			// - this should be defined in page.js load() function probably, so it's loaded together with the website
			try {
				// 2. In case there are no data (user did not retrieve them previously), then retrieve them from GSC
				// const response = await getData(domainName, domainId, '2023-01-01', '2024-01-30', ['page']);
				const response = await getData(domainName, domainId, '2023-01-01', '2024-01-30');
				// 3. Return the data from the front-end
				return {
					status: 'success',
					data: response.data
				};
			} catch (error) {
				return {
					status: 'failure',
					data: {
						message: error.message
					}
				};
			}
		}

		return {
			status: 'failure',
			data: 'No data found. There might be an issue with access to domain property in Google Search Console.'
		};
	}
};
