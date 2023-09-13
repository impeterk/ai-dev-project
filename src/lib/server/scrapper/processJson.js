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
 */
export function processJson(data) {
	return JSON.stringify(JSON.parse(data), null, 2);
}