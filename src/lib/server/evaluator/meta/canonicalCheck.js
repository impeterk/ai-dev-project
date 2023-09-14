import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

export async function evaluateCanonical(config, value, type, key) {
	if (isEmpty(value)) {
		await updateIssueDocument(config.domain, config.dateOfScan, config.urlId, type, key, 'missing');
	} else {
		// Placeholder: Assuming if it's not empty, it's fine.
		await updateIssueDocument(config.domain, config.dateOfScan, config.urlId, type, key, 'ok');
	}
}
