import { getConfig } from './config';
import { checkMetaData } from './meta';
import { checkBodyData } from './body';
import { checkSocialData } from './social';
import { checkSchemaData } from './schema';
import { getScanCollection } from '../../firebase/getCollection';
import { updateIssueDocument } from '../../firebase/updateCollection';

export async function initiateEvaluation(domain, dateOfScan) {
	let config = getConfig(domain, dateOfScan);

	try {
		const scanResults = await getScanCollection(config.domain, config.dateOfScan);
		// Run all checks for each scanned url
		const promises = Object.entries(scanResults).map(async ([urlId, urlData]) => {
			let issues = {}; // Empty the issues object for each urlId
			config.urlId = urlId; // Get the ID of scanned url used in Firestore

			// Run all evaluation checks
			issues.meta = checkMetaData(config, urlData.meta);
			issues.body = checkBodyData(config, urlData.body);
			issues.social = checkSocialData(config, urlData.social);
			issues.schema = checkSchemaData(config, urlData.schema);

			// Collect promise in promises array
			return updateIssueDocument(config, issues);
		});

		await Promise.all(promises);
	} catch (error) {
		console.error('Error during evaluation:', error);
		throw error;
	}
}
