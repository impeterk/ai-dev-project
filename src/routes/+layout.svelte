<script>
	import '../app.css';
	import { FirebaseApp } from 'sveltefire';
	import { firestore, auth } from '$lib/firebase';

	// Initialize Firebase
</script>

<FirebaseApp {auth} {firestore} >
	<slot />
</FirebaseApp>
