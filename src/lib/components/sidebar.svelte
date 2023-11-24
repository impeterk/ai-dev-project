<script>
	import { FilePlusSolid, HomeSolid, ArrowRightFromBracketSolid } from 'flowbite-svelte-icons';
	import NavLink from './navlink.svelte';

	async function logout() {
		// Try to logout the user
		const response = await fetch('/api/logout', { method: 'POST' });

		// If successful reload the page and return user to login/registration screen
		if (response.status == 200) {
			location.reload();
		}
	}
</script>

<nav class="flex h-full w-24 flex-col justify-between bg-gradient-to-b from-primary to-accent">
	<ul class="font-small">
		<NavLink href="/" tooltip="home">
			<HomeSolid class="h-3/4 w-3/4 text-inherit" />
		</NavLink>
		<NavLink href="/newdomain" tooltip="New Domain">
			<FilePlusSolid class="h-3/4 w-3/4 text-inherit" />
		</NavLink>
	</ul>
	<button
		on:click={logout}
		tooltip="Log Out"
		class="group flex items-center justify-center rounded-xl border-primary p-5 m-2 hover:bg-secondary hover:text-primary text-white"
	>
		<ArrowRightFromBracketSolid class="h-3/4 w-3/4 text-inherit" />
	</button>
</nav>
