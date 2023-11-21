export async function handle({ event, resolve }) {
	// Get the user from the cookies every time the hook is resolved
	const isLogged = event.cookies.get('user')
		? JSON.parse(event.cookies.get('user')).isLogged
		: false;
		
	console.log('hook:');
	console.dir(isLogged);

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
