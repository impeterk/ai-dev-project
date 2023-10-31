import { firestore } from "$lib/firebase"
import { collection, getDocs, query, orderBy, limit, startAfter, endBefore, limitToLast } from "firebase/firestore"
import { firstInCollection, firstVisible, lastInCollection, lastVisible, currentPage, currentLimit, currentCollection } from "$lib/store"
import { collectionStore } from 'sveltefire';
import { get } from "svelte/store";


/**
 * function which queries first load from collection and 
 * sets up variables in global store for pagination
 * 
 * @param {string} collectionPath - path to collection in database
 * @param {string} orderField - name of field, by which the collection should be ordered
 * @param {string} orderType - type of order be "acs" or "desc"
 */


export async function initialLoad(collectionPath, orderField, orderType = "asc") {
    let last
    let orderDirection
    let collectionRef = collection(firestore, collectionPath)
    let first = await getDocs(query(collectionRef, orderBy(orderField, orderType), limit(1)))

    // sets up first and first visible entries in current collection
    firstInCollection.update(value => first.docs[0])
    firstVisible.update(value => first.docs[0])

    // get current snapshot of limited collection to set up last visible 
    const data = query(collectionRef, orderBy(orderField, orderType), limit(get(currentLimit)))
    const dataResult = await getDocs(data)
    lastVisible.update(value => dataResult.docs.at(-1))

    // to get the last element, we have to change the order direction "asc" <==> "desc"
    if (orderType = "asc") {
        orderDirection = "desc"
    } else {
        orderDirection = "asc"
    }

    //set up last entry in current collection
    last = await getDocs(query(collectionRef, orderBy(orderField, orderDirection), limit(1)))
    lastInCollection.update(value => last.docs[0])

    //sets current Page for pagination to 1
    currentPage.set(1)

    // currentCollection.update(async value => value = await collectionStore(firestore, data))
    currentCollection.set(collectionStore(firestore, data))
    // returns real time updated data
    return collectionStore(firestore, data)
}


// loads next bunch of data
export async function nextLoad(collectionPath, orderField, orderType, lastRef) {
    // query FROM the last visible entry
    let dataQuery = query(collection(firestore, collectionPath), orderBy(orderField, orderType), limit(get(currentLimit)), startAfter(lastRef))

    // get snapshot of next visible collection to update first and last visible entries
    let data = await getDocs(dataQuery)

    firstVisible.update(value => data.docs[0])
    lastVisible.update(value => data.docs.at(-1))

    // updates current Page
    currentPage.update(value => value + 1)

    currentCollection.set(collectionStore(firestore, dataQuery))
    // returns realtime data from collection
    return collectionStore(firestore, dataQuery)
}

export async function previosLoad(collectionPath, orderField, orderType, firstRef) {
    // query TO the last visible first entry
    let dataQuery = query(collection(firestore, collectionPath), orderBy(orderField, orderType), limitToLast(get(currentLimit)), endBefore(firstRef))

    // get snapshot of next visible collection to update first and last visible entries
    let data = await getDocs(dataQuery)

    firstVisible.update(value => data.docs[0])
    lastVisible.update(value => data.docs.at(-1))

    // updates current Page
    currentPage.update(value => value - 1)
    currentCollection.set(collectionStore(firestore, dataQuery))

    // returns realtime data from collection
    return collectionStore(firestore, dataQuery)
}