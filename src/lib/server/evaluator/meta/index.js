import { evaluateTitle } from './titleCheck';
import { evaluateDescription } from './descriptionCheck';
import { evaluateCanonical } from './canonicalCheck';
import { evaluateAlternates } from './alternatesCheck';

/**
 * Evaluates the metadata of a webpage and returns their respective statuses.
 *
 * This function processes the provided metadata which includes the title, description, canonical,
 * and alternate values. Each metadata item is evaluated using its respective evaluation function.
 *
 * For the following metadata types:
 * - 'title': Evaluated for length and relevancy.
 * - 'description': Evaluated for length and content.
 * - 'canonical': Checked for presence.
 * - 'alternates': Checked for presence.
 *
 * Any unrecognized metadata key will log a warning.
 *
 * @param {Object} data - Object containing metadata items to be evaluated.
 * @returns {Object} - An object with keys being metadata types and values being their respective evaluation results.
 */
export function checkMetaData(data, all) {
	const metaData = Object.entries(data);

	let meta = {};

	for (const [key, value] of metaData) {
		switch (key) {
			case 'title':
				meta[key] = evaluateTitle(value, all);
				break;

			case 'description':
				meta[key] = evaluateDescription(value, all);
				break;

			case 'canonical':
				meta[key] = evaluateCanonical(value);
				break;

			case 'alternates':
				meta[key] = evaluateAlternates(value);
				break;

			default:
				console.warn('Unknown value passed to checkMetaData method: ' + key);
				break;
		}
	}

	return meta;
}
