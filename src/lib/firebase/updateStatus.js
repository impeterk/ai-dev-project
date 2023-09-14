import { firestore } from '$lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export async function updateStatus(domain, status) {
	let docRef = doc(firestore, `domain/${domain}`);
    
	try {
		await updateDoc(docRef, { status: status });
	} catch (e) {
		console.log(e);
		await updateDoc(docRef, { status: 'aborted' });
	}
}
