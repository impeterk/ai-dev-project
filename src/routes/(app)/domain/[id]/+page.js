import { firestore } from "$lib/firebase";
import { collectionStore } from "sveltefire";
import { getDoc, doc, orderBy, query, limit, collection } from 'firebase/firestore'
import { breadcrumbs } from "$lib/store";

export async function load({ params, url }) {
    // get ID from params
    let { id } = params

    // get doc for additional information 
    const docRef = doc(firestore, "domain", id);
    const domainDoc = await getDoc(docRef);

    // returns last 5 scans ordered by date
    const data = collectionStore(firestore, query(collection(firestore, "domain", id, 'dateofscan'), orderBy("date", "desc"), limit(5)))


    return {
        id: domainDoc.id,
        name: domainDoc.data().name,
        datesCollection: data
    }
}