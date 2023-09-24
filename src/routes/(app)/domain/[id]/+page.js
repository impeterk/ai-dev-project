import { firestore } from "$lib/firebase";
import { getDoc, doc } from 'firebase/firestore'

export async function load({ params }) {
    let { id } = params

    const docRef = doc(firestore, "domain", id);
    const data = await getDoc(docRef);
    return { data }
}