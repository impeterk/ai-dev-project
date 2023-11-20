import { auth, firestore } from './index.js';
import {
	doc,
	setDoc,
	getDocs,
	collection,
	query,
	where,
	serverTimestamp
} from 'firebase/firestore';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail
} from 'firebase/auth';

/**
 * Registers a new user with the provided email, password, and organization.
 * It creates a new user in Firebase's AUTH database and also creates a corresponding document in Firebase's FIRESTORE database.
 * The document in the FIRESTORE database has the same ID as the user's UID and contains the user's email, organization, and the timestamp of creation.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @param {string} organization - The organization of the user.
 * @returns {Promise<object>} - A promise that resolves to the registered user object.
 * @throws {Error} - If the registration fails.
 */
export async function register(email, password, organization) {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		// Create a new user in Firebase's AUTH db
		const user = userCredential.user;
		// Create a new user in Firebase's FIRESTORE db
		await setDoc(doc(firestore, 'users', user.uid), {
			email: email,
			organization: organization,
			created_at: serverTimestamp()
		});

		return user;
	} catch (error) {
		console.log('Registration failed:', error);
		throw error;
	}
}

/**
 * Logs in a user with the provided email and password.
 * It authenticates the user using Firebase's AUTH database and then retrieves the corresponding document from Firestore database.
 * The document in the Firestore database is expected to contain the user's organization field.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} - A promise that resolves to the logged-in user object.
 * @throws {Error} - If the login fails.
 */
export async function login(email, password) {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;

		// find a user in Firebase's FIRESTORE db by user.email and return organization field of matched document
		const userQuery = await getDocs(
			query(collection(firestore, 'users'), where('email', '==', user.email))
		);

		return {
			uid: user.uid,
			email: user.email,
			organization: userQuery.docs[0].data().organization
		};
	} catch (error) {
		console.log('Sign-in failed:', error);
		throw error;
	}
}

/**
 * Resets the password for a user with the provided email.
 *
 * @param {string} email - The email of the user.
 * @returns {Promise<void>} - A promise that resolves when the password reset email is sent.
 * @throws {Error} - If the password reset fails.
 */
export async function resetPassword(email) {
	try {
		await sendPasswordResetEmail(auth, email);
	} catch (error) {
		console.log('Password reset failed:', error);
		throw error;
	}
}
