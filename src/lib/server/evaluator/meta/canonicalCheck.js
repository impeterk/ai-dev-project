import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

export async function evaluateCanonical(config, value) {
	if (isEmpty(value)) {
		await updateIssueDocument(config, 'missing');
	} else {
		// Placeholder: Assuming if it's not empty, it's fine.
		await updateIssueDocument(config, 'ok');
	}
}
