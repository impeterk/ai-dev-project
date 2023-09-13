import { firestore } from './index';
import { doc, updateDoc } from 'firebase/firestore';

export async function updateIssueDocument(domain, dateOfScan, urlId, type, key, data) {
	await updateDoc(
		doc(firestore, `domain/${domain}/dateofscan/${dateOfScan}/scannedurls/${urlId}`),
		{
			// issues: data
			[`issues.${type}.${key}`] : data
		}
	);
}
