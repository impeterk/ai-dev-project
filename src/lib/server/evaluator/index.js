import { getConfig } from './config';
import { checkMetaData } from './meta';
import { checkBodyData } from './body';
import { checkSocialData } from './social';
import { checkSchemaData } from './schema';
import { getScanCollection } from '../../firebase/getCollection';
import { updateStatus } from '../../firebase/updateStatus';
import { updateIssueDocument } from '../../firebase/updateCollection';

export async function initiateEvaluation(domain, dateOfScan) {
	let config = getConfig(domain, dateOfScan);

	// Init an empty Issue object which will be passed to DB
	let issues = {};

	try {
		const scanResults = await getScanCollection(config.domain, config.dateOfScan);
		// Set new status
		await updateStatus(config.domain, 'evaluating');

		// Run all checks for each scanned url
		const promises = Object.entries(scanResults).map(async ([urlId, urlData]) => {
			config.urlId = urlId; // Get the ID of scanned url used in Firestore

			issues.meta = checkMetaData(config, urlData.meta);
			// 	meta: {
			// 		title: String,
			// 		description: String,
			// 		canonical: String,
			// 		alternates: String
			// 	},

			issues.body = checkBodyData(config, urlData.body);
			// 	body: {
			// 		headlines: {
			// 			h1: String,
			// 			h2: String,
			// 			h3: String,
			// 			h4: String,
			// 			h5: String,
			// 			h6: String
			// 		},
			// 		images: [
			// 			{
			// 				alt: String,
			// 				src: String
			// 			},
			// 			{
			// 				alt: String,
			// 				src: String
			// 			}
			// 		]
			// 	},

			issues.social = checkSocialData(config, urlData.social);
			// 	social: {
			// 		title: String,
			// 		description: String,
			// 		image: String
			// 	},

			issues.schema = checkSchemaData(config, urlData.schema);
			// 	schema: String,

			await updateIssueDocument(config, issues);
		});

		// Update status once done
		// await Promise.all(promises).then(async () => {
		// 	await updateStatus(config.domain, 'finished');
		// });

		// await updateIssueDocument(config, issues).then(async () => {
		// 	await updateStatus(config.domain, 'finished');
		// });
	} catch (error) {
		console.error('Error during evaluation:', error);
		throw error;
	}
}

// let issues = {
// 	body: {
// 		headlines: {
// 			h1: String,
// 			h2: String,
// 			h3: String,
// 			h4: String,
// 			h5: String,
// 			h6: String
// 		},
// 		images: [
// 			{
// 				alt: String,
// 				src: String
// 			},
// 			{
// 				alt: String,
// 				src: String
// 			}
// 		]
// 	},

// 	meta: {
// 		title: String,
// 		description: String,
// 		canonical: String,
// 		alternates: String
// 	},

// 	social: {
// 		title: String,
// 		description: String,
// 		image: String
// 	},

// 	schema: String,
// };
