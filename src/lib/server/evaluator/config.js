import { adjustDomain } from '../scanner/adjustDomain';

export function getConfig(domain, date) {
	return {
		domain: adjustDomain(domain),
		dateOfScan: date,
		urlId: null, // populated after the collection is fetched from DB
		type: null, // populated after the specific check is initiated (meta, body, schema...)
		key: null // populated after the specific check is initiated (title, description, etc...)
	};
}
