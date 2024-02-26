import pkg from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import {FB_SERVICE_ACCOUNT} from "$env/static/private"

try {
pkg.initializeApp({ credential: pkg.credential.cert(JSON.parse(FB_SERVICE_ACCOUNT)) });
} catch(error) {
    if (!/already exists/u.test(err.message)) {
        console.error('Firebase Admin Error: ', err.stack)
      }
}
export { pkg as admin };

