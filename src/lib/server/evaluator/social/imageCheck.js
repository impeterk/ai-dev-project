import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

export async function evaluateImage(config, value, type, key) {
	if (!isEmpty(value)) {
		// check the response code returned by image
		await updateIssueDocument(config.domain, config.dateOfScan, config.urlId, type, key, 'ok');
	} else {
		// return missing
		await updateIssueDocument(config.domain, config.dateOfScan, config.urlId, type, key, 'missing');
	}
}
