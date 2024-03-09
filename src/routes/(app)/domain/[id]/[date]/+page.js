import { initialLoad } from '$lib/utils/dataLoad';
import { get } from 'svelte/store';
import {
	currentLimit,
	collectionPath,
	orderField,
	orderDirection,
	currentUserOrgId,
	gscData,
	resetGscData
} from '$lib/store';
import { firestore } from '$lib/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { filterDomainData } from '$lib/gapi/filterData.js';

export async function load({ url, params }) {
	let { id, date } = params;

	currentLimit.set(10);
	collectionPath.set(`domain/${id}/dateofscan/${date}/scannedurls`);
	orderField.set('url');
	orderDirection.set('asc');
	await initialLoad(
		`domain/${id}/dateofscan/${date}/scannedurls`,
		'url',
		'asc',
		get(currentUserOrgId)
	);

	// Get GSC data if there are any
	const docRef = doc(firestore, `domain/${id}/dateofscan/${date}`);
	const docSnap = await getDoc(docRef);

	// Filter the full domain data with custom algorithm
	// and set the GSC data returned from FB
	if (docSnap.data().gscData) {
		console.log('Filtering!');
		const filtered = filterDomainData(docSnap.data().gscData);
		if (filtered.length > 0) {
			console.log('Setting!');
			gscData.set(filtered);
		} else {
			resetGscData();
		}
	}

	return gscData;
}
