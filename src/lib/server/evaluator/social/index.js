import { evaluateTitle } from './titleCheck';
import { evaluateDescription } from './descriptionCheck';
import { evaluateImage } from './imageCheck';

export function checkSocialData(config, data) {
	const socialData = Object.entries(data);

	let social = {};

	config.type = 'social';
	// const promises = []; 

	for (const [key, value] of socialData) {
		config.key = key;

		switch (key) {
			case 'title':
				// promises.push(evaluateTitle(config, value));

				social[key] = evaluateTitle(config, value);
				break;
			case 'description':
				// promises.push(evaluateDescription(config, value));

				social[key] = evaluateDescription(config, value);
				break;
			case 'image':
				// promises.push(evaluateImage(config, value));

				social[key] = evaluateImage(config, value);
				break;

			default:
				console.warn('Unknown value passed to checkSocialData method: ' + config.key);
				break;
		}
	}

	// await Promise.all(promises);

	return social;
}
