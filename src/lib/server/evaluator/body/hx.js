import { isEmpty } from '../isEmpty';
import { isUnique } from '../isUnique';
import { updateIssueDocument } from '../../../firebase/updateCollection';

/**
 * Evaluates the content of a given headline and updates the corresponding database record.
 * 
 * The function specifically handles headlines from 'h2' to 'h6' (known as Hx). For a given headline:
 * 1. Checks if the content is not empty.
 * 2. Validates if the entries within the headline are unique.
 * 3. Based on the validation, it updates the database record for the provided domain, scan date, and URL ID.
 * 
 * @param {Object} config - Configuration object containing details about the domain, date of scan, and the URL ID.
 * @param {string} type - The issue type being evaluated.
 * @param {string} key - Key associated with the issue type.
 * @param {string} index - The type of headline being evaluated (e.g., 'h2', 'h3', etc.).
 * @param {Object} headline - The specific headline object being processed.
 * 
 * Internal flow:
 * - If the headline is not empty, it checks its uniqueness.
 *   - If unique, the status 'ok' is set for that headline.
 *   - If not unique, the status 'duplicates' is set.
 * - If the headline is empty, an empty string is set for its status.
 * - The evaluated status is then sent to be updated in the database.
 */
export async function evaluateHx(config, type, key, index, headline) {
	if (!isEmpty(headline[index])) {
		const status = isUnique(headline[index]) ? 'ok' : 'duplicates';
		await updateIssueDocument(
			config.domain,
			config.dateOfScan,
			config.urlId,
			type,
			key,
			{
				[index]: status
			},
			true
		);
	} else {
		await updateIssueDocument(
			config.domain,
			config.dateOfScan,
			config.urlId,
			type,
			key,
			{
				[index]: ''
			},
			true
		);
	}
}
