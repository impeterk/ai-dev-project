import { logout } from '../../../lib/firebase/auth.js';
import cookie from 'cookie';

export async function POST({ params }) {
	let data = null;
	let serializedCookie = '';
	try {
		data = await logout();

		if (data && data.isLoggedOut) {
			serializedCookie = cookie.serialize(
				'user',
				JSON.stringify({
					isLogged: false,
					email: null,
					organization: null,
					jwt: null
				}),
				{
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					maxAge: 0
				}
			);
		}
	} catch (error) {
		console.error(error);
	}

	const response = {
		status: data && data.isLoggedOut ? 200 : 500,
		error: data && data.isLoggedOut ? false : true,
		message: data && data.isLoggedOut ? 'User was logged out' : 'User was not logged out'
	};

	return new Response(JSON.stringify(response), {
		status: data && data.isLoggedOut ? 200 : 500,
		headers: {
			'Set-Cookie': serializedCookie,
			'Content-Type': 'application/json'
		}
	});
}
