import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
	apiKey: 'AIzaSyC7T_oDCKSUooIXRwSmHVHoJdzP3dBuzL8',
	authDomain: 'aidevproject.firebaseapp.com',
	projectId: 'aidevproject',
	storageBucket: 'aidevproject.appspot.com',
	messagingSenderId: '624735331098',
	appId: '1:624735331098:web:26c9445bfc9fc2a3d282a3'
};

const app = initializeApp(firebaseConfig, 'main');
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
