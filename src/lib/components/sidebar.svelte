<script>
	import Icon from '@iconify/svelte';
	import NavLink from './navlink.svelte';
</script>

<nav class="flex h-full w-24 flex-col bg-gradient-to-b from-primary to-accent">
	<ul class="font-medium">
		<NavLink href="/" tooltip="home">
			<Icon icon="mdi:home" class="text-inherit" />
		</NavLink>
		<NavLink href="/newdomain" tooltip="New Domain">
			<Icon icon="mdi:file-document-plus" class="text-inherit" />
		</NavLink>
	</ul>
</nav>
