import { checkMetaData } from './meta';
import { checkBodyData } from './body';
import { checkSocialData } from './social';
import { checkSchemaData } from './schema';
import { getScanCollection } from '../../firebase/getCollection';
import { updateStatus } from '../../firebase/updateStatus';
import { adjustDomain } from '../scanner/adjustDomain';

export async function initiateEvaluation(domain, dateOfScan) {
	// domain = adjustDomain(domain);
	let config = {
		domain: adjustDomain(domain),
		dateOfScan: dateOfScan,
		urlId: null
	};

	try {
		const scanResults = await getScanCollection(config.domain, config.dateOfScan);
		await updateStatus(config.domain, 'evaluating');

		// Run all checks for each scanned url
		const promises = Object.entries(scanResults).map(([urlId, urlData]) => {
			config.urlId = urlId;

			checkMetaData(config, urlData.meta);
			checkSocialData(config, urlData.social);
			checkBodyData(config, urlData.body);
			checkSchemaData(config, urlData.schema);
		});

		await Promise.all(promises).then(async () => {
			await updateStatus(config.domain, 'finished');
		});
	} catch (error) {
		console.error('Error during evaluation:', error);
		throw error;
	}
}
