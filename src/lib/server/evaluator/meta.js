import { isEmpty } from './isEmpty';
import { updateIssueDocument } from '../../firebase/updateCollection';

export async function checkMetaData(domain, dateOfScan, data, urlId) {
	// console.log('checkMetaData before: ' + data);
	const metaData = Object.entries(data);
	const type = 'meta';
	// console.log('checkMetaData after: ' + metaData);

	let foundIssues = {};

	for (const [key, value] of metaData) {
		switch (key) {
			case 'title':
				console.log('hello title');
				if (!isEmpty(value)) {
					if (value.length >= 50 && value.length < 60) {
						await updateIssueDocument(domain, dateOfScan, urlId, type, key, 'ok');
					} else if (value.length < 50) {
						await updateIssueDocument(domain, dateOfScan, urlId, type, key, 'short');
					} else if (value.length > 60) {
						await updateIssueDocument(domain, dateOfScan, urlId, type, key, 'long');
					}
				} else {
					await updateIssueDocument(domain, dateOfScan, urlId, type, key, 'missing');
				}
				break;

			case 'description':
				if (!isEmpty(value)) {
					// Assuming you might want to check the length of the description as well
					// Placeholder logic: adjust as needed.
					if (value.length >= 150 && value.length < 160) {
						await updateIssueDocument(domain, dateOfScan, urlId, type, key, 'ok');
					} else if (value.length < 150) {
						await updateIssueDocument(domain, dateOfScan, urlId, type, key, 'short');
					} else if (value.length > 160) {
						await updateIssueDocument(domain, dateOfScan, urlId, type, key, 'long');
					}
				} else {
					await updateIssueDocument(domain, dateOfScan, urlId, type, key, 'missing');
				}
				break;

			case 'canonical':
				if (isEmpty(value)) {
					await updateIssueDocument(domain, dateOfScan, urlId, type, key, 'missing');
				} else {
					// Placeholder: Assuming if it's not empty, it's fine.
					await updateIssueDocument(domain, dateOfScan, urlId, type, key, 'ok');
				}
				break;

			case 'alternates':
				if (!isEmpty(value)) {
					// Placeholder: Assuming if it's not empty, it's fine.
					await updateIssueDocument(domain, dateOfScan, urlId, type, key, 'ok');
				} else {
					await updateIssueDocument(domain, dateOfScan, urlId, type, key, 'missing');
				}
				break;

			default:
				console.warn('Unknown value passed to checkMetaData method: ' + key);
				break;
		}
	}

	// metaData.forEach(async ([key, value]) => {
	// });

	console.log(foundIssues);
	return foundIssues;
}
