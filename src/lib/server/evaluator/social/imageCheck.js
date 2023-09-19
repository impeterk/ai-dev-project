import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

export function evaluateImage(config, value) {
	if (!isEmpty(value)) {
		// check the response code returned by image
		// await updateIssueDocument(config, 'ok');
		return 'ok';
	} else {
		// return missing
		// await updateIssueDocument(config, 'missing');
		return 'missing';
	}
}
