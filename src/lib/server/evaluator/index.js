import { getConfig } from '../../utils/config';
import { checkMetaData } from './meta';
import { checkBodyData } from './body';
import { checkSocialData } from './social';
import { checkSchemaData } from './schema';
import { getScanCollection } from '../../firebase/getCollection';
import { updateIssueDocument } from '../../firebase/updateCollection';

/**
 * Initiates a comprehensive evaluation of scanned data for a specified domain and scan date.
 *
 * This function fetches scan results for the given domain and scan date using the `getScanCollection` method.
 * For each scanned URL within the results:
 * 1. Metadata, body data, social data, and schema data are evaluated.
 * 2. Identified issues are categorized into 'meta', 'body', 'social', and 'schema' and stored in the 'issues' object.
 * 3. Each issue set is then asynchronously updated in the Firebase database using the `updateIssueDocument` method.
 *
 * If any errors are encountered during the evaluation or update process, they are logged and propagated.
 *
 * @param {string} domain - The domain of the website that was scanned.
 * @param {string} dateOfScan - The specific date when the website was scanned.
 * @returns {Promise<void>} - Resolves when all evaluations and updates are completed.
 * @throws Will throw an error if there's an issue in fetching the scan collection or during evaluation.
 */
export async function initiateEvaluation(domain, dateOfScan, all) {
	let config = getConfig(domain, dateOfScan);

	try {
		const scanResults = await getScanCollection(config.domain, config.dateOfScan);

		// Run all checks for each scanned url
		const promises = Object.entries(scanResults).map(async ([urlId, urlData]) => {
			let issues = {}; // Empty the issues object for each urlId
			config.urlId = urlId; // Get the ID of scanned url used in Firestore

			// Collect issues - run all evaluation checks
			issues.meta = checkMetaData(urlData.meta, all);
			issues.body = checkBodyData(urlData.body, all);
			issues.social = checkSocialData(urlData.social, all);
			issues.schema = checkSchemaData(urlData.schema);

			// Collect issues data as a promise in promises array
			return updateIssueDocument(config, issues);
		});

		await Promise.all(promises);
	} catch (error) {
		console.error('Error during evaluation:', error);
		throw error;
	}
}
