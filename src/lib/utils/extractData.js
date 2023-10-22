/**
 * Processes an array of datasets and extracts specific properties from each dataset.
 *
 * Each dataset in the input data array is expected to have the following structure:
 * {
 *    url: <url string>,
 *    scrappedData: {
 *      meta: { description: <string>, title: <string> },
 *      body: { headlines: { h1: <array> } }
 *    }
 * }
 *
 * For each dataset in the data array, this function will:
 * 1. Always extract the `url` property.
 * 2. Navigate to and extract the `meta.description`, `meta.title`, `body.headlines.h1`, 'body.images.alt', 'social.title', 'social.description' properties
 *    from the `scrappedData` object.
 * 3. Return the extracted data in a new structure:
 * {
 *    url: <url string>,
 *    description: <extracted meta description>,
 *    title: <extracted meta title>,
 *    h1: <extracted h1 array>
 * }
 *
 * @param {Array} data - An array of datasets to process.
 * @returns {Array} An array of objects with the extracted data.
 */
export function extractDataFromDataset(data) {
	return data.map((item) => {
		let extracted = { url: item.url };
		for (let prop of [
			'meta.description',
			'meta.title',
			'body.headlines.h1',
			'body.images.alt',
			'social.title',
			'social.description'
		]) {
			let parts = prop.split('.');
			let value = item.scrappedData;
			for (let part of parts) {
				value = value && value[part];
			}
			switch (prop) {
				case 'meta.description':
					extracted.description = value;
					break;
				case 'meta.title':
					extracted.title = value;
					break;
				case 'social.description':
					extracted.OGdescription = value;
					break;
				case 'social.title':
					extracted.OGtitle = value;
					break;
				case 'body.headlines.h1':
					extracted.h1 = value;
					break;
				case 'body.images.alt':
					extracted.alt = value;
					break;

				default:
					console.log('Unknown property passed to extract: ' + prop);
					break;
			}
		}
		return extracted;
	});
}
