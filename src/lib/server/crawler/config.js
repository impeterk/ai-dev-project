/**
 * Generates a configuration object for the crawler based on the provided domain.
 *
 * This helper function creates unique names for the request queue and dataset,
 * ensuring that each crawl session has its distinct queue & dataset. It also constructs
 * a domain-specific pattern for URLs that should be enqueued by the crawler.
 *
 * @param {string} domain - The base domain for which the configuration should be created.
 * @returns {Object} - An object containing the queue name, dataset name, and domain pattern.
 */
export function getConfig(domain) {
	let timeStamp = new Date().getTime().toString();

	return {
		queueName: domain + '-' + timeStamp + '-' + 'queue',
		datasetName: domain + '-' + timeStamp + '-' + 'dataset',
		domainPattern: [`${domain}/**`]
	};
}
