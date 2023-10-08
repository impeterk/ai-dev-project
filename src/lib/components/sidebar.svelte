<script>
	import { FilePlusSolid, HomeSolid } from 'flowbite-svelte-icons';
	import NavLink from './navlink.svelte';
</script>

<nav class="flex h-full w-24 flex-col bg-gradient-to-b from-primary to-accent">
	<ul class="font-medium">
		<NavLink href="/" tooltip="home">
			<HomeSolid class="h-full w-full text-inherit" />
		</NavLink>
		<NavLink href="/newdomain" tooltip="New Domain">
			<FilePlusSolid class="h-full w-full text-inherit" />
		</NavLink>
	</ul>
</nav>
