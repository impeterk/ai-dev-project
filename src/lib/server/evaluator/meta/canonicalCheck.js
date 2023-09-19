import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

export function evaluateCanonical(config, value) {
	if (isEmpty(value)) {
		// await updateIssueDocument(config, 'missing');
		return 'missing'
	} else {
		//  Assuming if it's not empty, it's fine - either self-ref or canonical page.
		// await updateIssueDocument(config, 'ok');
		return 'ok'
	}
}
