import { initialLoad, nextLoad, previosLoad } from "$lib/utils/dataLoad";
import { firestore } from "$lib/firebase"
import { collection, getDocs, query, onSnapshot, orderBy, limit, getDoc, endBefore, limitToLast, startAfter } from "firebase/firestore"
import { firstInCollection, firstVisible, lastInCollection, lastVisible, currentCollection } from "$lib/store"
import { collectionStore } from 'sveltefire';
import { get } from "svelte/store";

export async function load({url}) {
    let lastId = url.searchParams.get("loadafter") || null
    let firstId = url.searchParams.get("loadbefore") || null
    let data

    if (lastId) {
        let lastRef = get(lastVisible)
        data = await nextLoad('domain', "name", "asc", lastRef)
    } else if (firstId) {
        let firstRef = get(firstVisible)
        data = await previosLoad('domain', "name", "asc", firstRef)

    } else {
        data = await initialLoad("domain", "name")

    }

    return { domains: data, status: "finished" }
}