export function adjustDomain(rawDomain) {
	// Remove 'https://' prefix if present
	if (rawDomain.includes('https://')) {
		rawDomain = rawDomain.replace('https://', '');
	}

	// Extract domain part by taking the substring before the first '/'
	return rawDomain.split('/')[0];
}
