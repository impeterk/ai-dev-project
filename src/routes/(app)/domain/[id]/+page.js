import { firestore } from "$lib/firebase";
import { getDoc, doc } from 'firebase/firestore'

export async function load({ params }) {
    // get ID from params
    let { id } = params

    // get doc for additional information 
    const docRef = doc(firestore, "domain", id);
    const domainDoc = await getDoc(docRef);


    return {
        id: domainDoc.id,
        name: domainDoc.data().name
    }
}