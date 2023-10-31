<script>
	import '../app.css';
	import { FirebaseApp } from 'sveltefire';
	import { firestore, auth } from '$lib/firebase';
	import { browser } from '$app/environment';
	import { userLocale } from '$lib/store';
	import { get } from 'svelte/store';
	// userLocales
	// TODO: rework to get userLocales from request to client
	if (browser && !get(userLocale)) {
		let tmp = window.navigator.language || 'en-US';
		if (window.navigator.language.includes('-')) {
			userLocale.set(tmp);
		} else {
			userLocale.set(`${tmp}-${tmp}`);
		}
	}
</script>

<FirebaseApp {auth} {firestore}>
	<slot />
</FirebaseApp>
