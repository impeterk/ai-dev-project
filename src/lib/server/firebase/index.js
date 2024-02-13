import * as admin from 'firebase-admin';
import serviceAccount from './aidevproject-firebase-adminsdk-vb664-5b35bacc2b.json';

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

export { admin };
