import { gapi } from './index';
import { getConfig } from '../utils/config';
import { updateSearchConsoleDocument } from '../firebase/updateCollection';
import { printLog } from '../utils/logger';

/**
 * Retrieves data from the Google Search Console API and stores it in Firebase.
 * @param {string} domain - The domain name or URL.
 * @param {string} domainId - The domain ID.
 * @param {string} startDate - The start date for the data retrieval.
 * @param {string} endDate - The end date for the data retrieval.
 * @param {string[]} dimensions - An array of dimensions for the data retrieval.
 * @returns {Promise<object>} - A promise that resolves to the response data from the API.
 */
export async function getData(domain, domainId, startDate, endDate, dimensions = null) {
	try {
		const config = getConfig(domainId ? domainId : domain);

		// Search query parameters for google search console
		const parameters = {
			siteUrl: domain,
			requestBody: {
				startDate: startDate,
				endDate: endDate,
				dimensions: dimensions ? dimensions : ['page'],
				rowLimit: 5000
			}
		};

		// TBD - THIS SHOULD BE RAN ONLY ONCE IN 1-3 MONTHS
		// TO AVOID EXCEEDING GSC API QUOTA LIMITS

		const response = await gapi.searchanalytics.query(parameters);

		if (response && response.status === 200 && response.data) {
			// Filter the data with custom algorithm
			const perspectivePages = evaluateDomain(response.data.rows);

			// Store the filtered data in Firebase
			await updateSearchConsoleDocument(config, perspectivePages);
			// Print to terminal
		}

		// Return data to Front-end
		return response;
	} catch (err) {
		return err;
	}
}

/**
 * Evaluates the domain data based on average impressions, average CTR, and position.
 * @param {Array} data - The array of data objects representing domain statistics.
 * @returns {Array} - The filtered data based on the evaluation criteria.
 */
function evaluateDomain(data) {
	// 1. Get average # of impressions of the whole domain
	const avgImpressions = data.reduce((acc, item) => acc + item.impressions, 0) / data.length;
	// 2. Get average CTR of the whole domain
	const avgCtr = data.reduce((acc, item) => acc + item.ctr, 0) / data.length;
	// 3. Get pages with above average # of impressions, below average of CTR and position lower than 5
	const filteredData = data.filter(
		(item) => item.impressions > avgImpressions && item.ctr < avgCtr && item.position >= 5
	);

	return filteredData;
}
