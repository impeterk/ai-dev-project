// Get complete data
export function scrapAllData($) {
	return {
		title: $('title').text(),
		description: $('meta[name="description"]').attr('content'),
		social: {
			title: $('meta[property="og:title"]').attr('content'),
			description: $('meta[property="og:description"]').attr('content'),
			image: $('meta[property="og:image"]').attr('content')
		},
		schema: processJson($('script[type="application/ld+json"]').html())
	};
}

// Get only meta-title & meta-description
export function scrapBasicData($) {
	return {
		title: $('title').text(),
		description: $('meta[name="description"]').attr('content')
	};
}

// Get only social open graph data
export function scrapSocialData($) {
	return {
		social: {
			title: $('meta[property="og:title"]').attr('content'),
			description: $('meta[property="og:description"]').attr('content'),
			image: $('meta[property="og:image"]').attr('content')
		}
	};
}

// Get only parsed Schema data
export function scrapSchemaData($) {
	return {
		schema: processJson($('script[type="application/ld+json"]').html())
	};
}

// Helper function for parsing & stringifying JSON data such as schema
function processJson(data) {
	return JSON.stringify(JSON.parse(data), null, 2);
}
