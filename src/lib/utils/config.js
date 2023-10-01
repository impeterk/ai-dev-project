import { adjustDomain } from './adjustDomain';

export function getConfig(domain, date) {
	return {
		domain: adjustDomain(domain),
		dateOfScan: date,
		urlId: null // populated after the collection is fetched from DB
	};
}
