/**
 * Determines if all values within the provided dataset (array) are unique.
 *
 * The function utilizes the JavaScript Set object to automatically filter out
 * duplicate values. The Set object only stores unique values, hence, by
 * comparing the size of the Set to the length of the original array, we can
 * determine the uniqueness of values in the dataset.
 *
 * @param {Array} dataset - The array of values to be checked for uniqueness.
 *                          It can contain any data type, and the function
 *                          assumes that the input is always an array.
 * @returns {boolean} Returns true if all values in the dataset are unique.
 *                    Returns false if there are any duplicates.
 */

export function isUnique(dataset) {
	return new Set(dataset).size === dataset.length;
}

/**
 * Checks if a given value appears more than once for a specified property within a dataset.
 *
 * The property parameter can refer to any key in the dataset objects, such as 'url', 'description', 'title', 'h1', 'OGdescription', or 'OGtitle'.
 * This function is particularly useful in combination with the output of the extractDataFromDataset function,
 * which processes datasets and returns them in a specific structure.
 *
 * @param {string} property - The property (or key) of the item within the dataset to check. This can be any of the keys like 'url', 'description', 'title', 'h1', 'OGdescription', or 'OGtitle'.
 * @param {any} value - The value to check for duplicity against the specified property.
 * @param {Array<object>} data - The dataset in which to check for the duplicate value.
 * @returns {boolean} - Returns true if the value appears more than once for the given property in the dataset, otherwise false.
 */
export function isDuplicate(property, value, data) {
	const matchingItems = data.filter((item) => item[property] === value);
	return matchingItems.length > 1;
}
