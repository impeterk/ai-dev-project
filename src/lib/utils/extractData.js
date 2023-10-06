export function extractDataFromDataset(data) {
	data.map((item) => {
		let extracted = { url: item.url };
		for (let prop of ['meta.description', 'meta.title', 'body.headlines.h1']) {
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
				case 'body.headlines.h1':
					extracted.h1 = value;
					break;

				default:
					console.log('Unknown property passed to extract: ' + prop);
					break;
			}
		}
		return extracted;
	});
}
