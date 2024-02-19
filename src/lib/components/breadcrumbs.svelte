<script>
	import { breadcrumbs } from '$lib/store';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
</script>

<div class="flex flex-wrap">
	<ul class="flex items-center gap-4">
		{#if $page.url.pathname !== '/'}
			<li>
				<a href="/"> <Icon icon="mdi:home-outline" class="self-end text-3xl text-primary" /> </a>
			</li>
			<span class="font-black">/</span>
		{/if}
		{#each $breadcrumbs as link}
			<li
				class="flex text-lg underline-offset-4 {$page.url.pathname.split('/').at(-1) === link[0]
					? 'text-xl text-accent underline'
					: 'text-lg text-primary'}"
			>
				<a href={link[1].link} class="flex">{link[1].id}</a>
			</li>
			<span class="font-black last:hidden">/</span>
		{/each}
	</ul>
</div>
