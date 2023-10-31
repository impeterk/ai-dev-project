import { getConfig } from '../../utils/config';
import { getScanCollection } from '../../firebase/getCollection';
import { updateSuggestionDocument } from '../../firebase/updateCollection';
import { ai } from './prompts';
import { limitChecker, truncateTextToTokens } from './utils';

export async function initiateSuggestions(domain, dateOfScan) {
	let config = getConfig(domain, dateOfScan);
	const scanResults = await getScanCollection(config.domain, config.dateOfScan);

	let promises = Object.entries(scanResults).map(async ([urlId, urlData], index) => {
		try {
			// Initiate default empty suggestion object which will be passed to Firebase
			let suggestions = {
				meta: {
					title: '',
					description: ''
				},
				social: {
					title: '',
					description: ''
				}
			};

			// Declare local config
			let localConfig = { ...config, urlId: urlId };

			// Stringify the url data for AI prompt without issues object
			let stringifiedUrlData = JSON.stringify({ ...urlData, issues: undefined });
			stringifiedUrlData = truncateTextToTokens(stringifiedUrlData);

			// Check if there's an issue and if yes, initiate AI prompt
			// META TITLE
			if (urlData.issues.meta.title !== 'ok') {
				let metaTitle = await limitChecker(() => ai.generateMetaTitle(stringifiedUrlData));
				suggestions.meta.title = metaTitle ? metaTitle : '';
			}

			// META DESCRIPTION
			if (urlData.issues.meta.description !== 'ok') {
				let metaDescription = await limitChecker(() =>
					ai.generateMetaDescription(stringifiedUrlData)
				);
				suggestions.meta.description = metaDescription ? metaDescription : '';
			}

			// SOCIAL TITLE
			if (urlData.issues.social.title !== 'ok') {
				let socialTitle = await limitChecker(() => ai.generateSocialTitle(stringifiedUrlData));
				suggestions.social.title = socialTitle ? socialTitle : '';
			}

			// SOCIAL DESCRIPTION
			if (urlData.issues.social.description !== 'ok') {
				let socialDescription = await limitChecker(() =>
					ai.generateSocialDescription(stringifiedUrlData)
				);
				suggestions.social.description = socialDescription ? socialDescription : '';
			}

			console.log(urlData.url);
			console.log(suggestions);

			// Delaying the database write to prevent potential throttling issues
			// Once the new suggestions are generated, they need to be saved in the database.
			// To avoid potential database throttling or hitting write limits, there's an
			// introduced delay based on the index of the URL being processed.
			// For example, the first URL will have a delay of 0ms, the second will have 300ms,
			// the third will have 600ms, and so on.
			return await new Promise((resolve, reject) => {
				console.log('Waiting for DB write in 350ms');
				// console.log(60 * index + 'ms');

				setTimeout(async () => {
					try {
						let result = await updateSuggestionDocument(localConfig, suggestions);
						resolve(result);
					} catch (error) {
						reject(error);
					}
				}, 350);
				// setTimeout(async () => {
				// 	try {
				// 		let result = await updateSuggestionDocument(localConfig, suggestions);
				// 		resolve(result);
				// 	} catch (error) {
				// 		reject(error);
				// 	}
				// }, 60 * index);

			});
		} catch (error) {
			console.error(`Error processing URL ${urlId}:`, error);
			return null;
		}
	});

	// Finally execute the promises array and store all suggestion objects to the Firebase
	await Promise.all(promises);
}
