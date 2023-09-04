/**
 * Extracts comprehensive data from a given web page body.
 * 
 * This function aggregates data from multiple scraping functions to provide 
 * a holistic view of the webpage's relevant information. The data extracted includes:
 * - Meta information (e.g., title, description, canonical URL, alternate URLs)
 * - Body content (e.g., headlines, images)
 * - Social open graph data (e.g., OG title, OG description, OG image)
 * - Parsed Schema data
 * 
 * @param {Object} $ - An instance of the web page body (received from the crawler instance).
 * @returns {Object} An object containing:
 *   - meta: Meta information extracted by the scrapMetaData function.
 *   - body: Body content extracted by the scrapBodyData function.
 *   - social: Social open graph data extracted by the scrapSocialData function.
 *   - schema: Parsed Schema data extracted by the scrapSchemaData function.
 */
export function scrapAllData($) {
	return {
		meta: scrapMetaData($),
		body: scrapBodyData($),
		social: scrapSocialData($),
		schema: scrapSchemaData($)
	};
}

/**
 * Extracts meta data from a given web page body.
 * 
 * This function retrieves the following information:
 * - Page title
 * - Meta description
 * - Canonical URL
 * - Alternate URLs (with hreflang attributes)
 * 
 * @param {Object} $ - An instance of the web page body (received from the crawler instance).
 * @returns {Object} An object containing:
 *   - title: The content of the <title> tag.
 *   - description: The content of the meta description tag.
 *   - canonical: The href attribute of the canonical link tag.
 *   - alternates: An array of objects, each containing the href and hreflang attributes from alternate link tags.
 */
export function scrapMetaData($) {
	return {
		title: $('title').text(),
		description: $('meta[name="description"]').attr('content'),
		canonical: $('link[rel="canonical"]').attr('href'),
		alternates: getAllObjects($, 'link[rel="alternate"][hreflang]', ['href', 'hreflang'])
	};
}

/**
 * Extracts relevant content data from the body of a given web page.
 * 
 * This function focuses on gathering the main content-related elements of a webpage.
 * Specifically, it extracts:
 * - Headlines ranging from h1 to h6.
 * - Images along with their source URLs and alt texts.
 * 
 * @param {Object} $ - An instance of the web page body received from the crawler instance.
 * @returns {Object} An object containing:
 *   - headlines: An object with keys h1 through h6, each containing an array of 
 *                the respective headlines' text.
 *   - images: An array of objects, each containing the 'src' (source URL) and 
 *             'alt' (alt text) attributes of the images found in the page body.
 */
export function scrapBodyData($) {
	return {
		headlines: {
			h1: getAllObjects($, 'h1', ['text']),
			h2: getAllObjects($, 'h2', ['text']),
			h3: getAllObjects($, 'h3', ['text']),
			h4: getAllObjects($, 'h4', ['text']),
			h5: getAllObjects($, 'h5', ['text']),
			h6: getAllObjects($, 'h6', ['text']),
		},
		images: getAllObjects($, 'img', ['src', 'alt'])
	};
}

/**
 * Extracts social media-specific metadata from a given webpage body.
 * 
 * This function specifically extracts Open Graph (OG) meta tags, which are commonly used
 * to control how URLs are displayed when shared on social media platforms like Facebook.
 * 
 * @param {Object} $ - The body of the website received from the crawler instance.
 * @returns {Object} An object containing the OG title, description, and image URL.
 * 
 * @example
 * const result = scrapSocialData($);
 * console.log(result.title); // Outputs the content of <meta property="og:title">
 */
export function scrapSocialData($) {
	return {
		title: $('meta[property="og:title"]').attr('content'),
		description: $('meta[property="og:description"]').attr('content'),
		image: $('meta[property="og:image"]').attr('content')
	};
}

/**
 * Extracts, processes, and returns the structured Schema.org data (JSON-LD) from a given webpage body.
 * 
 * Schema.org data in JSON-LD format is commonly embedded in web pages to provide structured
 * metadata about the content. This function extracts the content of the <script> tag 
 * containing this data, and then processes it to return a structured representation.
 * 
 * @param {Object} $ - The body of the website received from the crawler instance.
 * @returns {Object} A structured representation of the Schema.org data.
 * 
 * @example
 * const schemaData = scrapSchemaData($);
 * console.log(schemaData.name); // If the schema contains a 'name' property, this will output its value.
 */export function scrapSchemaData($) {
	return processJson($('script[type="application/ld+json"]').html());
}

/**
 * Parses a given JSON string and then re-serializes it with formatting for human readability.
 * 
 * This function first parses the input JSON string into a JavaScript object using `JSON.parse()`.
 * It then stringifies this object back into a JSON string using `JSON.stringify()`, 
 * with additional parameters to format it with an indentation of 2 spaces for better readability.
 * 
 * @param {string} data - The input JSON string.
 * @returns {string} A pretty-printed, formatted JSON string.
 * 
 * @example
 * const rawJSON = '{"name":"John","age":30,"city":"New York"}';
 * const formattedJSON = processJson(rawJSON);
 * console.log(formattedJSON);
 * // Outputs:
 * // {
 * //   "name": "John",
 * //   "age": 30,
 * //   "city": "New York"
 * // }
 */function processJson(data) {
	return JSON.stringify(JSON.parse(data), null, 2);
}

/**
 * Extracts specified attributes from elements matched by the defined selector.
 * @param {Object} $ - The body of website from crawler instance.
 * @param {string} selector - The CSS selector to match elements.
 * @param {Array<string>} attributes - An array of attribute names to retrieve.
 * @returns {Array<Object>} An array of objects containing the specified attributes.
 */
function getAllObjects($, selector, attributes) {
	return $(selector)
		.map(function () {
			const element = $(this);
			const result = {};
			attributes.forEach((attr) => {
				if (attr === 'text') {
					result[attr] = element.text(); // get the actual value of the HTML tag
				} else {
					result[attr] = element.attr(attr); // get the value of HTML tag's attribute
				}
			});
			return result;
		})
		.get();
}
