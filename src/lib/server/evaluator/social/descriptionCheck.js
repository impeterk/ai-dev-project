import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

export async function evaluateDescription(config, value) {
	if (!isEmpty(value)) {
		if (value.length >= 50 && value.length < 200) {
			await updateIssueDocument(config, 'ok');
		} else if (value.length < 50) {
			await updateIssueDocument(config, 'short');
		} else if (value.length > 199) {
			await updateIssueDocument(config, 'long');
		}
	} else {
		await updateIssueDocument(config, 'missing');
	}
}
