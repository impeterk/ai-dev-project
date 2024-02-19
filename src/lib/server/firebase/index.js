import * as pkg from 'firebase-admin';
import serviceAccount from '../../../../service-account.json';
let admin
try {
admin = pkg.initializeApp({ credential: pkg.credential.cert(serviceAccount) });
} catch(error) {
    console.error(error)
}
export { admin };
