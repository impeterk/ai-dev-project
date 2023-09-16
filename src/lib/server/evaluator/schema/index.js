import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

// Check & evaluate SCHEMA data
export async function checkSchemaData(config, data) {
	if (isEmpty(data)) {
		await updateIssueDocument({ ...config, type: 'schema', key: null }, 'missing');
	}
}
