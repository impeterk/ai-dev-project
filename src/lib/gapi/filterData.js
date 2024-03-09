import { printLog } from "../utils/logger";

/**
 * Evaluates the domain data based on average impressions, average CTR, and position.
 * @param {Array} data - The array of data objects representing domain statistics.
 * @returns {Array} - The filtered data based on the evaluation criteria.
 */
export function filterDomainData(data) {
	// 1. Get average # of impressions of the whole domain
	const avgImpressions = data.reduce((acc, item) => acc + item.impressions, 0) / data.length;
	// 2. Get average CTR of the whole domain
	const avgCtr = data.reduce((acc, item) => acc + item.ctr, 0) / data.length;
	// 3. Get pages with above average # of impressions, below average of CTR and position lower than 5
	const filteredData = data.filter(
		(item) => item.impressions > avgImpressions && item.ctr < avgCtr && item.position >= 5
	);

	printLog('Filtered Data:', filteredData);

	return filteredData;
}