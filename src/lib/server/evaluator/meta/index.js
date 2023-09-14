import { evaluateTitle } from './titleCheck';
import { evaluateDescription } from './descriptionCheck';
import { evaluateCanonical } from './canonicalCheck';
import { evaluateAlternates } from './alternatesCheck';

export async function checkMetaData(config, data) {
	const metaData = Object.entries(data);
	const type = 'meta';
	const promises = [];

	for (const [key, value] of metaData) {
		switch (key) {
			case 'title':
				promises.push(evaluateTitle(config, value, type, key));
				break;

			case 'description':
				promises.push(evaluateDescription(config, value, type, key));
				break;

			case 'canonical':
				promises.push(evaluateCanonical(config, value, type, key));
				break;

			case 'alternates':
				promises.push(evaluateAlternates(config, value, type, key));
				break;

			default:
				console.warn('Unknown value passed to checkMetaData method: ' + key);
				break;
		}
	}

	await Promise.all(promises);
}
