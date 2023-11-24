import { auth, firestore } from './index.js';
import { admin } from '../server/firebase/index.js';
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
	sendPasswordResetEmail,
	signOut
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

		// Get the JWT token from firebase
		const jwt = await user.getIdToken();

		// find a user in Firebase's FIRESTORE db by user.email and return organization field of matched document
		const userQuery = await getDocs(
			query(collection(firestore, 'users'), where('email', '==', user.email))
		);

		this.verifyUser(jwt);

		return {
			uid: user.uid,
			email: user.email,
			organization: userQuery.docs[0].data().organization,
			jwt: jwt
		};
	} catch (error) {
		console.log('Sign-in failed:', error);
		throw error;
	}
}

/**
 * Asynchronously logs out the currently authenticated user.
 *
 * This function uses Firebase's `signOut` method to log out the user.
 * If the sign-out is successful, it returns an object with the current user (which should be null) 
 * and a boolean indicating that the user is logged out.
 * If there's an error during the sign-out process, it returns an object with the current user (which should be null),
 *  a boolean indicating that the user is logged out, and the error.
 */
export async function logout() {
	try {
		await signOut(auth);

		return {
			user: auth.currentUser,
			isLoggedOut: auth.currentUser == null ? true : false
		};
	} catch (error) {
		console.log('Error:', error);
		return {
			user: auth.currentUser,
			isLoggedOut: auth.currentUser == null ? true : false,
			error: error
		};
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
		// Handle error
	}
}
export async function logout() {
	try {
		await signOut(auth);

		return {
			user: auth.currentUser,
			isLoggedOut: auth.currentUser == null ? true : false
		};
	} catch (error) {
		console.log('Error:', error);
		return {
			user: auth.currentUser,
			isLoggedOut: auth.currentUser == null ? true : false,
			error: error
		};
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

/**
 * Verifies the user using a JWT token.
 * @param {string} jwt - The JWT token to verify.
 * @returns {Promise<{status: number, body: {isLogged: boolean, email?: string, error?: string}}>} - The verification result, including the status code and response body.
 */
export async function verifyUser(jwt) {
	if (!jwt) {
		console.log('No JWT provided');
		return {
			status: 401,
			body: { isLogged: false, error: 'No token provided' }
		};
	}

	try {
		const decodedToken = await admin.auth().verifyIdToken(jwt);
		// Token is valid, return some user data
		console.log('JWT valid');
		return {
			status: 200,
			body: { isLogged: true, email: decodedToken.email }
		};
	} catch (error) {
		console.log('JWT invalid');
		console.log(error);
		// Token is invalid
		return {
			status: 401,
			body: { isLogged: false, error: 'Invalid token' }
		};
	}
}
