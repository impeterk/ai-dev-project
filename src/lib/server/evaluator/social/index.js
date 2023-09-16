import { evaluateTitle } from './titleCheck';
import { evaluateDescription } from './descriptionCheck';
import { evaluateImage } from './imageCheck';

export async function checkSocialData(config, data) {
	const socialData = Object.entries(data);
	config.type = 'social';
	const promises = [];

	for (const [key, value] of socialData) {
		config.key = key;

		switch (key) {
			case 'title':
				promises.push(evaluateTitle(config, value));
				break;
			case 'description':
				promises.push(evaluateDescription(config, value));
				break;
			case 'image':
				promises.push(evaluateImage(config, value));
				break;

			default:
				console.warn('Unknown value passed to checkSocialData method: ' + config.key);
				break;
		}
	}

	await Promise.all(promises);
}
