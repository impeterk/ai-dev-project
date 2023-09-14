import { evaluateTitle } from './titleCheck';
import { evaluateDescription } from './descriptionCheck';
import { evaluateCanonical } from './canonicalCheck';
import { evaluateAlternates } from './alternatesCheck';

export async function checkMetaData(config, data) {
	const metaData = Object.entries(data);
	const type = 'meta';

	for (const [key, value] of metaData) {
		switch (key) {
			case 'title':
				await evaluateTitle(config, value, type, key);
				break;

			case 'description':
				await evaluateDescription(config, value, type, key);
				break;

			case 'canonical':
				await evaluateCanonical(config, value, type, key);
				break;

			case 'alternates':
				await evaluateAlternates(config, value, type, key);
				break;

			default:
				console.warn('Unknown value passed to checkMetaData method: ' + key);
				break;
		}
	}
}
