// imports
import { currentLimit, collectionPath, orderField, orderDirection } from '$lib/store';
import { initialLoad } from '$lib/utils/dataLoad.js';

export async function load({ fetch }) {
	//sets limit for results to fetch from database
	currentLimit.set(7);
	collectionPath.set('domain');
	orderField.set('name');
	orderDirection.set('asc');

	try {
		// Get the Organization ID of the currently logged user
		const response = await fetch('/api/organization');
		const data = await response.json();
		const orgId = data.message;

		// Load the Firebase collection of domains relevant for the
		// currently logged user's organization ID
		await initialLoad('domain', 'name', 'asc', orgId);
	} catch (error) {
		console.error('Error:', error);
	}
}
