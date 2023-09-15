import { evaluateHeadlines } from './headlinesCheck';

// To make your content effective and actionable, heading tags optimization is vital. In short, make sure to:
// TO CHECK IN BODY FOR HEADLINES
// Use one <h1> tag.
// Don’t forget about hierarchy <h1> through <h6> (though Google currently claims it’s not of top importance, it’s important to illustrate proper flow for readers).
// Apply keywords within headings based on their search volume.
// Keep headings brief and to the point.
// Don’t overuse H tags.
// Clear styles and format headings within the CMS to avoid unexpected/extra symbols within the tags.

export function checkBodyData(config, data) {
	// const bodyData = Object.entries(data);
	const bodyData = data;
	const type = 'body';
	const promises = [];

	// console.log(bodyData.headlines);
	promises.push(evaluateHeadlines(config, bodyData.headlines, type, 'headlines'));

	Promise.all(promises);
}
