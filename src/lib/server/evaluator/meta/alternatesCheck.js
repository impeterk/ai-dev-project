import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

export async function evaluateAlternates(config, value, type, key) {
	if (!isEmpty(value)) {
		// Placeholder: Assuming if it's not empty, it's fine.
		await updateIssueDocument(config.domain, config.dateOfScan, config.urlId, type, key, 'ok');
	} else {
		await updateIssueDocument(config.domain, config.dateOfScan, config.urlId, type, key, 'missing');
	}
}
