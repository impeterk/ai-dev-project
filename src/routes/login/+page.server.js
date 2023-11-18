import { get } from 'svelte/store';
import { redirect, fail } from '@sveltejs/kit';
import { updateUser, userStore } from '../../lib/store/auth.js';
import { login, register, resetPassword } from '../../lib/firebase/auth.js';

export const actions = {
	login: async ({ request, url }) => {
		let formData = await request.formData();

		const data = {
			email: formData.get('email'),
			password: formData.get('password')
		};

		try {
			const user = await login(data.email, data.password);

			// Update the store with the logged-in user
			if (user) {
				updateUser(user);
			}
		} catch (err) {
			console.error('Login error:', err);
			return fail(400, { error: true, message: JSON.stringify(err.code) });
		}

		// If the login was succesful - redirect user to the root
		if (get(userStore).isLogged) {
			throw redirect(302, '/');
		}
	},
	register: async ({ request, url }) => {
		let formData = await request.formData();

		const data = {
			email: formData.get('email'),
			password: formData.get('password'),
			action: formData.get('action')
		};

		try {
			const user = await register(data.email, data.password);
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
