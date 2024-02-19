import pkg from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../../../service-account.json';

try {
pkg.initializeApp({ credential: pkg.credential.cert(serviceAccount) });
} catch(error) {
    console.error(error)
}
export { pkg as admin };

