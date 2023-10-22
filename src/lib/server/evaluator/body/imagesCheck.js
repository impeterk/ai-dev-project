import { evaluateAlts } from './altTextsCheck';

/**
 * Evaluates the images in the provided data based on their 'alt' attribute values.
 *
 * For each image in the data:
 * - If the 'alt' attribute is missing or empty, it is flagged with 'missing'.
 * - If the 'alt' attribute is present, it is flagged with 'ok'.
 *
 * The function maps over the input data and creates an array of objects,
 * each object having an 'alt' property indicating its evaluation result
 * and a 'src' property containing the image's source URL.
 *
 * Notes: This function doesn't directly interact with Firestore but returns
 * an array of evaluation results. It is the responsibility of the caller to
 * handle any database operations based on the results.
 *
 * @param {Object} config - Configuration object containing domain, dateOfScan, and urlId.
 * @param {Array} data - Array of image objects to evaluate. Each object contains properties like 'alt' and 'src'.
 * @returns {Array<Object>} An array containing evaluation results for each image.
 */
export function evaluateImages(data, all) {
	try {
		const imgIssues = data.map((image) => ({
			alt: evaluateAlts(image.alt, all),
			src: image.src ? image.src : 'missing'
		}));

		if (imgIssues.length) {
			return imgIssues;
		} else {
			return '';
		}
	} catch (error) {
		console.error('Error evaluating images:', error);
	}
}
