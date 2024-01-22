import { firestore } from '$lib/firebase';
import { doc, addDoc, collection } from 'firebase/firestore';

/* adds item to the queue collection in firebase */
export async function addToQueue({ domainId, dateOfScan, startingUrl, aiToggle }) {

    return await addDoc(collection(firestore, 'queue'), {
        domainId, dateOfScan, startingUrl, aiToggle, status: 'added'
    })

}