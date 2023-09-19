import { evaluateHeadlines } from './headlinesCheck';
import { evaluateImages } from './imagesCheck';

export function checkBodyData(config, data) {
	const bodyData = data;

	let body = {};

	config.type = 'body';
	// const promises = [];

	// promises.push(evaluateHeadlines({ ...config, key: 'headlines' }, bodyData.headlines));
	// promises.push(evaluateImages({ ...config, key: 'images' }, bodyData.images));

	body.headlines = evaluateHeadlines({ ...config, key: 'headlines' }, bodyData.headlines);
	body.images = evaluateImages({ ...config, key: 'images' }, bodyData.images);

	// Promise.all(promises);
	return body;
	
}

//body: {
// 		headlines: {
// 			h1: String,
// 			h2: String,
// 			h3: String,
// 			h4: String,
// 			h5: String,
// 			h6: String
// 		},
// 		images: [
// 			{
// 				alt: String,
// 				src: String
// 			},
// 			{
// 				alt: String,
// 				src: String
// 			}
// 		]
// 	},
