import { gapi } from './index';

/**
 * Checks if the user has access to a specific domain using the Google API.
 * @param {string} domain - The domain to check access for.
 * @returns {Promise<boolean>} - A promise that resolves to true if the user has access, false otherwise.
 */
export async function hasAccess(domain) {
	try {
		const response = await gapi.sites.get({ siteUrl: domain });
		if (!response.errors && response.status === 200) {
			return true;
		}
	} catch (err) {
		// printLog('Google API access error', err);
		return false;
	}

	return false;
}
