import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

/**
 * Evaluates the images in the provided data for compliance with certain standards, 
 * specifically checking for the presence of the 'alt' attribute.
 * 
 * For images that do not have an 'alt' attribute, they are considered as issues. 
 * The issues, if any, are then updated in the Firestore database.
 * 
 * IMPORTANT: The existence of an 'images' document under 'issues.body.images' in the database 
 * denotes the presence of issues with the images. Unlike to other checks, there is no status message
 *  such as 'ok', 'missing', etc...
 *
 * @param {Object} config - Configuration object containing domain, dateOfScan, and urlId.
 * @param {Array} data - Array of image objects to evaluate. Each object contains properties like 'alt' and 'src'.
 * @param {String} type - Type of the evaluation. E.g., 'body'.
 * @param {String} key - Specific key for the evaluation. E.g., 'images'.
 * @returns {Promise<void>} Resolves once the data is evaluated and any issues are updated in the database.
 */
export async function evaluateImages(config, data, type, key) {
	try {
		const issues = data.filter(
            (image) => isEmpty(image.alt)).map(({ alt, src }) => ({ alt, src })
            );

		if (issues.length) {
			await updateIssueDocument(config.domain, config.dateOfScan, config.urlId, type, key, issues);
		}
	} catch (error) {
		console.error('Error evaluating images:', error);
	}
}
