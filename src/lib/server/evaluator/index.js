import { isEmpty } from './isEmpty';
import { checkMetaData } from './meta';
import { checkBodyData } from './body';
import { checkSocialData } from './social';
import { checkSchemaData } from './schema';
import { getScanCollection } from '../../firebase/getCollection';
import { adjustDomain } from '../scanner/adjustDomain';

export async function initiateEvaluation(domain, dateOfScan) {
	domain = adjustDomain(domain);

	try {
		const scanResults = await getScanCollection(domain, dateOfScan);

		// Run all checks for each scanned url
		const promises = Object.entries(scanResults).map(([urlId, urlData]) => {
			checkMetaData(domain, dateOfScan, urlData.meta, urlId);
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
