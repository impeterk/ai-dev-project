import { firestore } from '$lib/firebase';
import { getDocs, collection, query, limit, orderBy, getDoc } from 'firebase/firestore';
import { initiateScan } from '../scanner';
/**
1.Checks if items are in queue. 
2.Picks the first in queu with lowest date of scan.
3.Starts the scanning process, if status is not running. 
Ensures, only one scan at time is running
*/
export async function checkQueue() {
    const itemRef = await getDocs(query(collection(firestore, 'queue'), orderBy('dateOfScan', 'asc'), limit(1)))

    if (itemRef.docs.length == 0) {
        return
    }
    const { domainId, startingUrl, dateOfScan, status } = itemRef.docs[0].data()

    if (status === 'running') {
        return {
            status: 'scan already running'
        }
    }

    return initiateScan(domainId, dateOfScan, startingUrl)
}