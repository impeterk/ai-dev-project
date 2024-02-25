import { gapi } from './index';
import { getConfig } from '../utils/config';
import { updateSearchConsoleDocument } from '../firebase/updateCollection';
import { filterDomainData } from './filterData';

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
			// const perspectivePages = filterDomainData(response.data.rows);

			// Store the filtered data in Firebase
			// await updateSearchConsoleDocument(config, perspectivePages);
			await updateSearchConsoleDocument(config, response.data.rows);
		}

		// Return data to Front-end
		return response;
	} catch (err) {
		return err;
	}
}
