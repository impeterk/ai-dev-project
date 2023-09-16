import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

export async function evaluateDescription(config, value) {
	if (!isEmpty(value)) {
		// Assuming you might want to check the length of the description as well
		// Placeholder logic: adjust as needed.
		if (value.length >= 150 && value.length < 160) {
			await updateIssueDocument(config, 'ok');
		} else if (value.length < 150) {
			await updateIssueDocument(config, 'short');
		} else if (value.length > 160) {
			await updateIssueDocument(config, 'long');
		}
	} else {
		await updateIssueDocument(config, 'missing');
	}
}
