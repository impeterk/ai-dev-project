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

export function isDuplicate(property, value, data) {
	const matchingItems = data.filter(item => item[property] === value);
	return matchingItems.length > 1;
  }