import { evaluateTitle } from './titleCheck';
import { evaluateDescription } from './descriptionCheck';
import { evaluateCanonical } from './canonicalCheck';
import { evaluateAlternates } from './alternatesCheck';

export async function checkMetaData(config, data) {
	const metaData = Object.entries(data);
	// const type = 'meta';
	config.type = 'meta';
	const promises = [];

	for (const [key, value] of metaData) {
		config.key = key;

		switch (key) {
			case 'title':
				promises.push(evaluateTitle(config, value));
				break;

			case 'description':
				promises.push(evaluateDescription(config, value));
				break;

			case 'canonical':
				promises.push(evaluateCanonical(config, value));
				break;

			case 'alternates':
				promises.push(evaluateAlternates(config, value));
				break;

			default:
				console.warn('Unknown value passed to checkMetaData method: ' + key);
				break;
		}
	}

	await Promise.all(promises);
}
