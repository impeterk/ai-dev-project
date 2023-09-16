import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

export async function evaluateTitle(config, value) {
	if (!isEmpty(value)) {
		if (value.length >= 60 && value.length < 89) {
			await updateIssueDocument(config, 'ok');
		} else if (value.length < 60) {
			await updateIssueDocument(config, 'short');
		} else if (value.length > 88) {
			await updateIssueDocument(config, 'long');
		}
	} else {
		await updateIssueDocument(config, 'missing');
	}
}
