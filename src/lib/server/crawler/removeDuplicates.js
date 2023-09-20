/**
 * Removes duplicate entries from a dataset based on the URL property.
 * After retrieving all the data from the dataset, this function filters
 * out any duplicate URLs and returns the dataset in its original format,
 * but with only unique URLs. The total count in the returned dataset
 * is also updated to reflect the number of unique URLs.
 *
 * @param {Object} dataset - The dataset object from which data will be fetched.
 * @returns {Promise<Object>} - A promise that resolves to the dataset in its original format, but with unique URLs.
 */
export async function removeDuplicates(dataset) {
	// After the crawl
	const allData = await dataset.getData();

	// Filter out duplicate URLs
	const uniqueUrlsData = allData.items.reduce((accumulator, current) => {
		// Check if the URL is not already in the accumulator
		if (!accumulator.some((item) => item.url === current.url)) {
			accumulator.push(current);
		}
		return accumulator;
	}, []);

	// Return the dataset in its original format, but without duplicates
	return {
		...allData,
		items: uniqueUrlsData,
		total: uniqueUrlsData.length // Update the total count
	};
}
