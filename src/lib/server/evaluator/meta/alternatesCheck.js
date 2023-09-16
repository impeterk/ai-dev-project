import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

export async function evaluateAlternates(config, value) {
	if (!isEmpty(value)) {
		// Placeholder: Assuming if it's not empty, it's fine.
		await updateIssueDocument(config, 'ok');
	} else {
		await updateIssueDocument(config, 'missing');
	}
}
