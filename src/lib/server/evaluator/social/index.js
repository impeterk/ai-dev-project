import { evaluateTitle } from "./titleCheck";
import { evaluateDescription } from "./descriptionCheck";
import { evaluateImage } from "./imageCheck";

export async function checkSocialData(config, data) {
	const socialData = Object.entries(data);
	const type = 'social';
	const promises = [];

	for (const [key, value] of socialData) {
		switch (key) {
			case 'title':
				promises.push(evaluateTitle(config, value, type, key));
				break;
			case 'description':
				promises.push(evaluateDescription(config, value, type, key));
				break;
			case 'image':
				promises.push(evaluateImage(config, value, type, key));
				break;
		}
	}

	await Promise.all(promises);
}
