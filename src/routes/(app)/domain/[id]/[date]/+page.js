import { initialLoad } from '$lib/utils/dataLoad';
import { get } from 'svelte/store';
import {
	currentLimit,
	collectionPath,
	orderField,
	orderDirection,
	currentUserOrgId
} from '$lib/store';

export async function load({ url, params }) {
	let { id, date } = params;

	currentLimit.set(10);
	collectionPath.set(`domain/${id}/dateofscan/${date}/scannedurls`);
	orderField.set('url');
	orderDirection.set('asc');
	await initialLoad(`domain/${id}/dateofscan/${date}/scannedurls`, 'url', 'asc', get(currentUserOrgId));
}
