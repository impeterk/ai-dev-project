import { isEmpty } from './isEmpty';
import { checkMetaData } from './meta';
import { checkBodyData } from './body';
import { checkSocialData } from './social';
import { checkSchemaData } from './schema';
import { getScanCollection } from '../../firebase/getCollection';
import { adjustDomain } from '../scanner/adjustDomain';

export async function initiateEvaluation(domain, dateOfScan) {
	// domain = adjustDomain(domain);
	let config = {
		domain: adjustDomain(domain),
		dateOfScan: dateOfScan,
		urlId: null
	}

	try {
		const scanResults = await getScanCollection(config.domain, config.dateOfScan);

		// Run all checks for each scanned url
		const promises = Object.entries(scanResults).map(([urlId, urlData]) => {
			config.urlId = urlId;
			checkMetaData(config, urlData.meta);
		});

		await Promise.all(promises);
	} catch (error) {
		console.error('Error during evaluation:', error);
		throw error;
	}

	return true;

	let foundIssues = {};

	// const dataset = dataForEvaluate.items.map((item) => {

	//     foundIssues = checkMetaData(item.data.meta, item.url);
	// });

	dataForEvaluate.items.forEach((item) => {
		foundIssues.meta = {
			[item.url]: checkMetaData(item.data.meta, item.url)
		};

		// add BODY logic
		// add SOCIAL logic
		// add SCHEMA data

		// Finally return all found issues
	});

	// console.log('Howdy from index.js: ');
	// console.log(foundIssues.meta);
	return foundIssues;
}
