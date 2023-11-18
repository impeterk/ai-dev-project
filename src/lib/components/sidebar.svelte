<script>
	import { FilePlusSolid, HomeSolid, ArrowRightFromBracketSolid } from 'flowbite-svelte-icons';
	import NavLink from './navlink.svelte';
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
	<NavLink href="/logout" tooltip="Log Out">
		<ArrowRightFromBracketSolid class="h-3/4 w-3/4 text-inherit" />
	</NavLink>
</nav>