import { userStore } from './lib/store/auth.js';
import { get } from 'svelte/store';

export async function handle({ event, resolve }) {
	// Get the user from the store every time the hook is resolved
	const isLogged = get(userStore).isLogged;

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
