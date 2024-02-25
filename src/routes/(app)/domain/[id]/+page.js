import { firestore } from '$lib/firebase';
import { collectionStore, docStore } from 'sveltefire';
import { getDoc, doc, orderBy, query, limit, collection } from 'firebase/firestore';
import { breadcrumbs, gscData, resetGscData } from '$lib/store';
import { filterDomainData } from '../../../../lib/gapi/filterData.js';
import { printLog } from '../../../../lib/utils/logger.js';

export async function load({ params, url }) {
	// get ID from params
	let { id } = params;

	// get doc for additional information
	const docRef = doc(firestore, 'domain', id);
	const domainDoc = await getDoc(docRef);

	// Filter the full domain data with custom algorithm
	// and set the GSC data returned from FB
	if (domainDoc.data().gscData) {
		console.log('Filtering!');
		const filtered = filterDomainData(domainDoc.data().gscData);
		if (filtered.length > 0) {
			console.log('Setting!');
			gscData.set(filtered);
		} else {
			resetGscData();
		}
	}

	// returns last 5 scans ordered by date
	const data = collectionStore(
		firestore,
		query(collection(firestore, 'domain', id, 'dateofscan'), orderBy('date', 'desc'), limit(5))
	);

	return {
		id: domainDoc.id,
		name: domainDoc.data().name,
		datesCollection: data,
		gsc: domainDoc.data().gscAccess,
		gscData: gscData != [] ? gscData : null
	};
}
