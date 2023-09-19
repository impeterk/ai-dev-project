import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

export function evaluateAlternates(config, value) {
	if (!isEmpty(value)) {
		// Placeholder: Assuming if it's not empty, it's fine.
		// await updateIssueDocument(config, 'ok');
		return 'ok';
	} else {
		// await updateIssueDocument(config, 'missing');
		return 'missing';
	}
}
