import { gapi } from './index';
import { getConfig } from '../utils/config';
import { updateSearchConsoleDocument } from '../firebase/updateCollection';

/**
 * Retrieves data from the Google Search Console API and stores it in Firebase.
 * @param {string} domain - The domain name or URL.
 * @param {string} domainId - The domain ID.
 * @param {string} startDate - The start date for the data retrieval.
 * @param {string} endDate - The end date for the data retrieval.
 * @param {string[]} dimensions - An array of dimensions for the data retrieval.
 * @returns {Promise<object>} - A promise that resolves to the response data from the API.
 */
export async function getData(domain, domainId, startDate, endDate, dimensions) {
	try {
		const config = getConfig(domainId ? domainId : domain);

		// Search query for google search console
		const parameters = {
			siteUrl: domain,
			requestBody: {
				startDate: startDate,
				endDate: endDate,
				dimensions: dimensions,
				rowLimit: 10
			}
		};

		

		const response = await gapi.searchanalytics.query(parameters);

		if (response && response.status === 200 && response.data) {
			await updateSearchConsoleDocument(config, response.data.rows);
		}

		// Return data to Front-end
		return response;
	} catch (err) {
		return err;
	}
}
