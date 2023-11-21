import { redirect, fail } from '@sveltejs/kit';
import { login, register, resetPassword } from '../../lib/firebase/auth.js';

export const actions = {
	login: async ({ request, cookies }) => {
		let formData = await request.formData();

		const data = {
			email: formData.get('email'),
			password: formData.get('password')
		};

		try {
			const user = await login(data.email, data.password);

			// Save the User's info session to the cookies
			if (user) {
				cookies.set(
					'user',
					JSON.stringify({
						// uid: user.uid,
						isLogged: user.uid ? true : false,
						email: user.email,
						organization: user.organization
					}),
					{
						path: '/',
						httpOnly: true,
						sameSite: 'strict',
						maxAge: 60 * 60 * 24 * 7 // one week
					}
				);
			}
		} catch (err) {
			console.error('Login error:', err);
			return fail(400, { error: true, message: JSON.stringify(err.code) });
		}

		// If the login was successful - redirect user to the root
		if (cookies.get('user') && cookies.get('user').isLogged) {
			throw redirect(302, '/');
		}
	},
	register: async ({ request, url }) => {
		let formData = await request.formData();

		const data = {
			email: formData.get('email'),
			password: formData.get('password'),
			organization: formData.get('organization')
		};

		try {
			const user = await register(data.email, data.password, data.organization);

			return {
				success: true,
				message: `Registration was succesfull, please log-in to continue.`
			};
		} catch (err) {
			console.error('Registration error:', err);
			return fail(400, { error: true, message: JSON.stringify(err.code) });
		}
	},
	resetPassword: async ({ request, url }) => {
		let formData = await request.formData();

		const data = {
			email: formData.get('email')
		};

		try {
			const user = await resetPassword(data.email);
			return {
				success: true,
				message: `Password reset link has been sent to ${data.email}`
			};
		} catch (err) {
			console.error('Reset password error:', err);
			return fail(400, { error: true, message: JSON.stringify(err.code) });
		}
	}
};
