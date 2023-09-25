import { firestore } from "$lib/firebase"
import { collection, getDocs, query, onSnapshot, orderBy, limit, getDoc } from "firebase/firestore"
import { firstInCollection, firstVisible, lastInCollection, lastVisible, currentCollection } from "$lib/store"

import { collectionStore } from 'sveltefire';

/**
 * function which queries first load from collection and 
 * sets up variables in global store for pagination
 * 
 * @param {string} collectionPath - path to collection in database
 * @param {string} orderField - name of field, by which the collection should be ordered
 * @param {string} orderType - type of order be "acs" or "desc"
 */

export async function initialLoad(collectionPath, orderField, orderType = "asc") {
    let collectionRef = collection(firestore, collectionPath)
    let last
    let first = await getDocs(query(collectionRef, orderBy(orderField, orderType), limit(1)))
    let orderDirection


    firstInCollection.update(n => first.docs[0])
    firstVisible.update(n => first.docs[0])


    const data = query(collectionRef, orderBy(orderField, orderType), limit(10))
    const dataResult = await getDocs(data)

    if (orderType = "asc") {
        orderDirection = "desc"
    } else {
        orderDirection = "asc"
    }
    last = await getDocs(query(collectionRef, orderBy(orderField, orderDirection), limit(1)))

    lastVisible.update(n => dataResult.docs.at(-1))
    lastInCollection.update(n => last.docs[0])
    return collectionStore(firestore, data)
}