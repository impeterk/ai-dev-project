import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

export async function evaluateTitle(config, value, type, key) {
	if (!isEmpty(value)) {
		if (value.length >= 50 && value.length < 60) {
			await updateIssueDocument(config.domain, config.dateOfScan, config.urlId, type, key, 'ok');
		} else if (value.length < 50) {
			await updateIssueDocument(config.domain, config.dateOfScan, config.urlId, type, key, 'short');
		} else if (value.length > 60) {
			await updateIssueDocument(config.domain, config.dateOfScan, config.urlId, type, key, 'long');
		}
	} else {
		await updateIssueDocument(config.domain, config.dateOfScan, config.urlId, type, key, 'missing');
	}
}
