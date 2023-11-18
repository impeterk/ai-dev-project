import { userStore } from './lib/store/auth.js';
import { get } from 'svelte/store';

export async function handle({ event, resolve }) {
	const isLogged = get(userStore).isLogged;
	console.log('isLogged:', isLogged);
	console.log(event.route.id);

	// Non logged users trying to access a page other than /login will be redirected to /login
	if (!isLogged && event.route.id !== '/login') {
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/login'
			}
		});
	}

	// Logged users trying to access /login will be redirected to /
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
