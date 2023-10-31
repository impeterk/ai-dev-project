/**
 * Determines the validity of a request based on its URL.
 * The function checks if a request's URL contains any parameters, whether it
 * includes CMS paths and whether it includes the given domain.
 * If the URL contains parameters, the function logs the ignored URL.
 * Similarly, if the URL doesn't include the specified domain, the function logs that the page is
 * skipped. If neither of these conditions are met, the function
 * considers the request valid.
 *
 * @param {Object} req - The request object containing the URL to be checked.
 * @param {string} domain - The domain to be matched against the request's URL.
 * @returns {boolean|Object} - Returns the request object if it's valid, otherwise returns false.
 */
export function isValid(req, domain) {
    // Check if the URL includes the domain
    if (!req.url.includes(domain)) {
        console.log('Skipping the following page - not part of scanned domain: ' + req.url);
        return false;
    }

    // Ignore all links with parameters
    if (req.url.includes('?')) {
        console.log('Ignoring URL due to parameters: ' + req.url);
        return false;
    }

    // Ignore CMS paths
    if (req.url.includes('/content/heliux')) {
        console.log('Ignoring URL due to internal CMS path: ' + req.url);
        return false;
    }

    return req;
}