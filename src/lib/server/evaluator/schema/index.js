import { isEmpty } from '../isEmpty';
import { updateIssueDocument } from '../../../firebase/updateCollection';

// Check & evaluate SCHEMA data
export async function checkSchemaData(config, data) {
	// data = JSON.parse(data);
	// let adjustedData = Object.entries(data);
    const type = 'schema';

	if (isEmpty(data)) {
		await updateIssueDocument(config.domain, config.dateOfScan, config.urlId, type, null, 'missing');
	}
}
