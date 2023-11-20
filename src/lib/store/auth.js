import { writable } from 'svelte/store';

// Create a writable store to manage user data
const userStore = writable({
	isLogged: false,
	uid: null,
	email: null,
	organization: null
});

/**
 * Updates the user data in the userStore.
 *
 * This function takes a user object as an argument, which should contain `uid` and `email` properties.
 * It then updates the userStore with the new user data.
 * The `isLogged` property is set to `true` if both `uid` and `email` are truthy (i.e., they exist and are not `null`, `undefined`, `0`, `NaN`, or an empty string), and `false` otherwise.
 *
 * @param {Object} user - The user object containing the new user data.
 * @param {string} user.uid - The user's unique ID.
 * @param {string} user.email - The user's email address.
 * @param {string} user.organization - The user's organization id.
 */
const updateUser = (user) => {
	const { uid, email, organization } = user;

	// Updating store object
	userStore.update((userData) => {
		return {
			...userData,
			isLogged: !!uid && !!email,
			uid,
			email,
			organization
		};
	});
};

function reset() {
	userStore.set({
		isLogged: false,
		uid: null,
		email: null,
		organization: null
	});
}

// Export the store and the update function
export { userStore, updateUser, reset };
