import { evaluateHeadlines } from './headlinesCheck';
import { evaluateImages } from './imagesCheck';

export function checkBodyData(config, data) {
	const bodyData = data;
	config.type = 'body';
	const promises = [];

	promises.push(evaluateHeadlines({ ...config, key: 'headlines' }, bodyData.headlines));
	promises.push(evaluateImages({ ...config, key: 'images' }, bodyData.images));

	Promise.all(promises);
}
