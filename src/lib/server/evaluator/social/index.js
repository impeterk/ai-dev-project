import { evaluateTitle } from './titleCheck';
import { evaluateDescription } from './descriptionCheck';
import { evaluateImage } from './imageCheck';

/**
 * Evaluates social metadata of a webpage and maps them to corresponding evaluations.
 *
 * This function inspects the provided social metadata object and, based on its keys (e.g., 'title', 'description', 'image'),
 * delegates the evaluation to specialized functions. The results of these evaluations are stored in a new object that
 * mirrors the structure of the input, but with values representing the evaluation outcomes.
 *
 * If an unrecognized key is encountered, a warning is logged.
 *
 * @param {Object} data - The social metadata object containing properties like title, description, and image.
 * @returns {Object} - An object with the same keys as the input, but values representing the evaluation of each property.
 */
export function checkSocialData(data, all) {
	const socialData = Object.entries(data);

	let social = {};

	for (const [key, value] of socialData) {
		switch (key) {
			case 'title':
				social[key] = evaluateTitle(value, all);
				break;
			case 'description':
				social[key] = evaluateDescription(value, all);
				break;
			case 'image':
				social[key] = evaluateImage(value);
				break;

			default:
				console.warn('Unknown value passed to checkSocialData method: ' + key);
				break;
		}
	}

	return social;
}
