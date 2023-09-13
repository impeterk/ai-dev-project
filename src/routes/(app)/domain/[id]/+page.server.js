import { initiateScan } from '$lib/server/scanner/index.js';
import { initiateEvaluation } from '$lib/server/evaluator/index.js';

export const actions = {
	default: async ({ request }) => {
		let formData = await request.formData();
		let domainId = formData.get('domainid');
		const rescanDomain = `https://${domainId}`;
		// creates a date when the scan started
		const dateOfScan = Date.now();

		// Initiate scan and store the data
		await initiateScan(rescanDomain, dateOfScan);

		// Once the data are stored, run the evaluation
		initiateEvaluation(rescanDomain, dateOfScan);
	}
};
