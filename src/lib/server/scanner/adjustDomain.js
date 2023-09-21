/**
 * Adjusts the provided domain by removing any 'https://' prefix and path information.
 *
 * This utility function is designed to take raw domain strings which may contain
 * protocols (e.g., 'https://') and/or paths and return a clean domain name.
 * For instance, given the input 'https://example.com/path/to/page',
 * it would return 'example.com'.
 *
 * - Removes the 'https://' prefix if present in the raw domain.
 * - Extracts the domain portion by trimming any path or parameters after the domain.
 *
 * @param {string} rawDomain - The raw domain string that may contain protocols and paths.
 * @returns {string} - The cleaned-up domain name without the protocol or path.
 */
export function adjustDomain(rawDomain) {
	// Remove 'https://' prefix if present
	if (rawDomain.includes('https://')) {
		rawDomain = rawDomain.replace('https://', '');
	}

	// Extract domain part by taking the substring before the first '/'
	return rawDomain.split('/')[0];
}
