import he from 'he';

/**
 * Extracts specified attributes from elements matched by the defined selector.
 * @param {Object} $ - The body of website from crawler instance.
 * @param {string} selector - The CSS selector to match elements.
 * @param {Array<string>} attributes - An array of attribute names to retrieve.
 * @returns {Array<Object>} An array of objects containing the specified attributes.
 */
export function getAllObjects($, selector, attributes) {
	return $(selector)
		.map(function () {
			const element = $(this);
			const result = {};
			attributes.forEach((attr) => {
				// image source fix for RAQN lazy loading
				if (attr === 'src' && element.attr(attr).includes('base64')) {
					// Based on DOM, we check multiple options, which could contain src for image 
					result[attr] = element.parent().parent().next().attr('src') || element.parent().next().attr('src') || element.attr('srcset')?.split('?').at(0).replace('\n', '').trim() || `src missing for ${element}`
				} else if (attr === 'text') {
					result[attr] = element.text() || ''; // get the actual value of the HTML tag
				} else {
					result[attr] = element.attr(attr) || ''; // get the value of HTML tag's attribute
				}
			});
			return result;
		})
		.get();
}
/**
 * Extracts a clean snippet of content from the body of a webpage.
 *
 * This function processes the content by performing the following steps:
 * 1. Fetches the entire content within the <body> tag.
 * 2. Removes unnecessary tags and the content they're wrapping, including but not limited to scripts, 
 *    styles, navigation elements, headers, footers, and various UI components.
 * 3. Converts the processed body content into a plain string.
 * 4. Strips off all the HTML tags from the string to retain pure textual content.
 * 5. Replaces excessive white spaces with a single space, ensuring the snippet remains neat.
 * 6. Decodes any HTML entities or special characters to their original form using the 'he' library.
 * 7. Truncates the final content to 650 characters to provide a concise snippet.
 *
 * @param {function} $ - The crawling result of the webpage.
 * @returns {string} - A cleaned-up, concise snippet of the webpage's body content.
 */
export function getBodySnippet($) {
	// Step 1: Get the content of the body tag
	let body = $('body');

	// Step 2: Remove unnecessary tags and content they're wrapping
	body
		.find(
			'script, style, noscript, a, .navigationmenu, path, symbol, .metanavigation, heliux-notifications, heliux-backtotop, .cookiebanner, heliux-header, header, heliux-logo, heliux-navigation, heliux-icon, button, heliux-nav-linklist, link, svg, heliux-footer, footer, img, meta'
		)
		.remove();

	// Step 3: Transform it into the string
	let snippet = body.html();

	// Step 4: Remove all HTML tags
	snippet = snippet.replace(/<\/?[^>]+(>|$)/g, '');

	// Step 5: Remove excessive whitespaces and replace them with just one
	snippet = snippet.replace(/\s+/g, ' ');

	// Step 6: Decode special characters using the 'he' library
	snippet = he.decode(snippet);

	// Finally, removed the 650 characters of the body as a snippet
	return snippet.slice(0, 650);
}
