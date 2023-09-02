// Get complete data
export function scrapAllData($) {
	return {
		title: this.scrapBasicData($).title,
		description: this.scrapBasicData($).description,
		social: this.scrapSocialData($),
		schema: this.scrapSchemaData($)
	};
}

// Get only meta-title & meta-description
// Used for getting all data but also callable as standalone function from crawler
export function scrapBasicData($) {
	return {
		title: $('title').text(),
		description: $('meta[name="description"]').attr('content')
	};
}

// Get only social open graph data
// Used for getting all data but also callable as standalone function from crawler
export function scrapSocialData($) {
	return {
		title: $('meta[property="og:title"]').attr('content'),
		description: $('meta[property="og:description"]').attr('content'),
		image: $('meta[property="og:image"]').attr('content')
	};
}

// Get only parsed Schema data
// Used for getting all data but also callable as standalone function from crawler
export function scrapSchemaData($) {
	return processJson($('script[type="application/ld+json"]').html());
}

// Helper function for parsing & stringifying JSON data such as schema
function processJson(data) {
	return JSON.stringify(JSON.parse(data), null, 2);
}
