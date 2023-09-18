import { getConfig } from './config';
import { checkMetaData } from './meta';
import { checkBodyData } from './body';
import { checkSocialData } from './social';
import { checkSchemaData } from './schema';
import { getScanCollection } from '../../firebase/getCollection';
import { updateStatus } from '../../firebase/updateStatus';

export async function initiateEvaluation(domain, dateOfScan) {
	// domain = adjustDomain(domain);
	let config = getConfig(domain, dateOfScan)

	try {
		const scanResults = await getScanCollection(config.domain, config.dateOfScan);
		// Set new status
		await updateStatus(config.domain, 'evaluating');

		// Run all checks for each scanned url
		const promises = Object.entries(scanResults).map(([urlId, urlData]) => {
			config.urlId = urlId; // Get the ID of scanned url used in Firestore

			checkMetaData(config, urlData.meta);
			checkBodyData(config, urlData.body);
			checkSocialData(config, urlData.social);
			checkSchemaData(config, urlData.schema);
		});

		// Update status once done
		await Promise.all(promises).then(async () => {
			await updateStatus(config.domain, 'finished');
		});
	} catch (error) {
		console.error('Error during evaluation:', error);
		throw error;
	}
}
