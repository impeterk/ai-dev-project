import { firestore } from '$lib/firebase';
import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
	limit,
	startAfter,
	endBefore,
	limitToLast
} from 'firebase/firestore';
import {
	firstInCollection,
	firstVisible,
	lastInCollection,
	lastVisible,
	currentPage,
	currentLimit,
	currentCollection,
	currentUserOrgId
} from '$lib/store';
import { get } from 'svelte/store';
import { collectionStore } from 'sveltefire';

/**
 * function which queries first load from collection and
 * sets up variables in global store for pagination
 *
 * @param {string} collectionPath - path to collection in database
 * @param {string} orderField - name of field, by which the collection should be ordered
 * @param {string} orderType - type of order be "acs" or "desc"
 */
export async function initialLoad(collectionPath, orderField, orderType = 'asc', orgId) {
	let last;
	let orderDirection;
	let collectionRef = collection(firestore, collectionPath);

	const domainQueries = {
		first: query(
			collectionRef,
			where('organization', '==', orgId),
			orderBy(orderField, orderType),
			limit(1)
		),
		main: query(
			collectionRef,
			where('organization', '==', orgId),
			orderBy(orderField, orderType),
			limit(get(currentLimit))
		),
		last: query(
			collectionRef,
			where('organization', '==', orgId),
			orderBy(orderField, 'desc'),
			limit(1)
		)
	};

	const urlQueries = {
		first: query(collectionRef, orderBy(orderField, orderType), limit(1)),
		main: query(collectionRef, orderBy(orderField, orderType), limit(get(currentLimit))),
		last: query(collectionRef, orderBy(orderField, 'desc'), limit(1))
	};

	orgId === undefined ? (orgId = get(currentUserOrgId)) : (orgId = orgId);

	//set up first entry in current collection
	let first = await getDocs(orderField == 'url' ? urlQueries.first : domainQueries.first);

	// sets up first and first visible entries in current collection
	firstInCollection.update((value) => first.docs[0]);
	firstVisible.update((value) => first.docs[0]);

	// get current snapshot of limited collection to set up last visible
	const data = orderField == 'url' ? urlQueries.main : domainQueries.main;

	const dataResult = await getDocs(data);

	lastVisible.update((value) => dataResult.docs.at(-1));

	// to get the last element, we have to change the order direction "asc" <==> "desc"
	// if ((orderType = 'asc')) {
	// 	orderDirection = 'desc';
	// } else {
	// 	orderDirection = 'asc';
	// }

	// sets up last  and last visible entries in current collection
	//set up last entry in current collection
	last = await getDocs(orderField == 'url' ? urlQueries.last : domainQueries.last);

	lastInCollection.update((value) => last.docs[0]);

	//sets current Page for pagination to 1
	currentPage.set(1);

	// currentCollection.update(async value => value = await collectionStore(firestore, data))
	currentCollection.set(collectionStore(firestore, data));
	// returns real time updated data
	return collectionStore(firestore, data);
}

// loads next bunch of data
export async function nextLoad(collectionPath, orderField, orderType, lastRef, orgId) {
	// query FROM the last visible entry
	let dataQuery = {
		domain: query(
			collection(firestore, collectionPath),
			where('organization', '==', orgId),
			orderBy(orderField, orderType),
			limit(get(currentLimit)),
			startAfter(lastRef)
		),
		url: query(
			collection(firestore, collectionPath),
			orderBy(orderField, orderType),
			limit(get(currentLimit)),
			startAfter(lastRef)
		)
	};
	// get snapshot of next visible collection to update first and last visible entries
	let data = await getDocs(orderField == 'url' ? dataQuery.url : dataQuery.domain);

	firstVisible.update((value) => data.docs[0]);
	lastVisible.update((value) => data.docs.at(-1));

	// updates current Page
	currentPage.update((value) => value + 1);

	currentCollection.set(
		collectionStore(firestore, orderField == 'url' ? dataQuery.url : dataQuery.domain)
	);
	// returns realtime data from collection
	return collectionStore(firestore, orderField == 'url' ? dataQuery.url : dataQuery.domain);
}

export async function previosLoad(collectionPath, orderField, orderType, firstRef, orgId) {
	// query TO the last visible first entry
	const dataQuery = {
		domain: query(
			collection(firestore, collectionPath),
			where('organization', '==', orgId),
			orderBy(orderField, orderType),
			limitToLast(get(currentLimit)),
			endBefore(firstRef)
		),
		url: query(
			collection(firestore, collectionPath),
			orderBy(orderField, orderType),
			limitToLast(get(currentLimit)),
			endBefore(firstRef)
		)
	};

	// get snapshot of next visible collection to update first and last visible entries
	let data = await getDocs(orderField == 'url' ? dataQuery.url : dataQuery.domain);

	firstVisible.update((value) => data.docs[0]);
	lastVisible.update((value) => data.docs.at(-1));

	// updates current Page if value is not zero

	currentPage.update((value) => value - 1);

	currentCollection.set(
		collectionStore(firestore, orderField == 'url' ? dataQuery.url : dataQuery.domain)
	);

	// returns realtime data from collection
	return collectionStore(firestore, orderField == 'url' ? dataQuery.url : dataQuery.domain);
}
