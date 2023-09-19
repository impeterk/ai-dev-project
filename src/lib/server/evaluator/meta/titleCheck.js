import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

export function evaluateTitle(config, value) {
	if (!isEmpty(value)) {
		if (value.length >= 50 && value.length < 60) {
			// await updateIssueDocument(config, 'ok');
			return 'ok';
		} else if (value.length < 50) {
			// await updateIssueDocument(config, 'short');
			return 'short';
		} else if (value.length >= 60) {
			// await updateIssueDocument(config, 'long');
			return 'long';
		}
	} else {
		// await updateIssueDocument(config, 'missing');
		return 'missing';
	}
}
