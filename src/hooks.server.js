import { verifyUser } from './lib/firebase/auth.js';

/**
 * Handles the request by verifying the user's JWT token and performing redirection if necessary.
 * @param {Object} options - The options object containing the event and resolve properties.
 * @param {Object} options.event - The event object representing the incoming request.
 * @param {Function} options.resolve - The resolve function to continue processing the request.
 * @returns {Promise<Response>} A promise that resolves to a Response object.
 */
export async function handle({ event, resolve }) {
	// Get the JWT token from the cookies
	let jwt = event.cookies.get('user') ? JSON.parse(event.cookies.get('user')).jwt : false;

	// Verify the token /w Firebase Authentication and tap into body of the response
	const isLogged = (await verifyUser(jwt)).body.isLogged;

	// Non logged users trying to access a page other than /login will be redirected to /login page
	if (!isLogged && event.route.id !== '/login') {
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/login'
			}
		});
	}

	// Logged users trying to access /login will be redirected to root page
	if (isLogged && event.route.id === '/login') {
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	}

	const response = await resolve(event);

	return response;
}
