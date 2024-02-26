import { firestore } from '$lib/firebase';
import { doc, updateDoc, collection, query, getDocs, where } from 'firebase/firestore';

/**
 * Asynchronously updates the status of a given domain in Firestore. If the update fails,
 * it sets the status to 'aborted'.
 *
 * @param {string} domain - The domain whose status needs to be updated.
 * @param {string} status - The new status to be set for the domain.
 * 
 * The function constructs a Firestore document path in the format: `domain/{domain}`
 * and attempts to update the 'status' field with the provided status. In case of an error,
 * the 'status' field is set to 'aborted' and the error is logged.
 * 
 * @returns {boolean} - Returns true if the status update was successful, false otherwise.
 */
export async function updateDomain(domain, options) {
    const docRef = doc(firestore, `domain/${domain}`);

    try {
        await updateDoc(docRef, options);
        return true;
    } catch (e) {
        console.log(`Error updating status for domain ${domain}:`, e);

        try {
            await updateDoc(docRef, { status: 'aborted' });
        } catch (nestedError) {
            console.log(`Error setting status to 'aborted' for domain ${domain}:`, nestedError);
        }

        return false;
    }
}

export async function updateQueue(dateOfScan) {
    console.log(dateOfScan)
    const q = query(collection(firestore, 'queue'), where('dateOfScan', '==', Number(dateOfScan)))
    const querySnapshot = await getDocs(q)


    let queueItemId
    querySnapshot.forEach(async (doc) => {
        console.log({doc})
        queueItemId = doc.id
    })
    await updateDoc(doc(firestore, `queue/${queueItemId}`), {
        status: 'running'
    })

    return queueItemId
}