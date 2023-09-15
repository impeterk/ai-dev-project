/**
 * Adjusts the format of the given headlines data.
 * 
 * This function processes an object containing various headline types (like 'h1', 'h2', etc.) and their 
 * respective data. For each headline type, it extracts the text content from the provided data structure
 * and returns it in a more streamlined format.
 * 
 * @param {Object} data - The original dataset containing headlines, where each key represents a headline type (e.g., 'h1', 'h2') and its value is an array of objects detailing that headline.
 * 
 * @returns {Array} - An array of objects where each object corresponds to a headline type and contains an array of the extracted text contents for that headline type.
 * 
 * Example:
 * Input: { h1: [{ text: 'Title1', attr: 'value1' }, { text: 'Title2', attr: 'value2' }] }
 * Output: [{ h1: ['Title1', 'Title2'] }]
 * 
 * Internal flow:
 * 1. Iterates through each key-value pair in the provided data.
 * 2. Maps over the value (which is expected to be an array of objects) and extracts the 'text' property from each object.
 * 3. Returns the restructured data in the desired format.
 */
export function adjustHeadlinesData(data) {
	const adjustedData = Object.entries(data).map(([key, value]) => {
		// console.log('Key: ' + key + ': ');
		return {
			[key]: value.map((item) => {
				return item.text;
			})
		};
	});

	return adjustedData;
}
