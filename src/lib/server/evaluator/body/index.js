import { evaluateHeadlines } from './headlinesCheck';
import { evaluateImages } from './imagesCheck';

/**
 * Assesses the body content of a webpage, specifically targeting headlines and images.
 *
 * This function takes in data related to the body content of a webpage. It evaluates potential 
 * issues or properties of both headlines and images present in the body. After evaluation, 
 * it aggregates the results into a single object that encapsulates the assessed data for 
 * both headlines and images.
 * 
 * @param {Object} data - The body content data to be evaluated.
 *    @property {Array<Object>} headlines - An array of headline objects present in the body.
 *    @property {Array<Object>} images - An array of image objects present in the body.
 * @returns {Object} - An object containing the evaluated data for headlines and images.
 *    @property {Object} headlines - The assessed data for the provided headlines.
 *    @property {Object} images - The assessed data for the provided images.
 */
export function checkBodyData(data, all) {
	let body = {};

	body.headlines = evaluateHeadlines(data.headlines, all);
	body.images = evaluateImages(data.images, all);

	return body;
}
