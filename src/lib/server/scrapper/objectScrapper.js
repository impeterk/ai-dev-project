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
				if (attr === 'text') {
					result[attr] = element.text() || ""; // get the actual value of the HTML tag
				} else {
					result[attr] = element.attr(attr) || ""; // get the value of HTML tag's attribute
				}
			});
			return result;
		})
		.get();
}