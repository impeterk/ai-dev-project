<script>
	import { breadcrumbs } from '$lib/store';
	import { page } from '$app/stores';
	import { HomeOutline } from 'flowbite-svelte-icons';
</script>

<div class="flex flex-wrap">
	<ul class="flex items-center gap-4">
		{#if $page.url.pathname !== '/'}
			<li>
				<a href="/"> <HomeOutline class="h-5 w-5 text-primary" /> </a>
			</li>
			<span class="font-black">/</span>
		{/if}
		{#each $breadcrumbs as link}
			<li
				class="text-lg underline-offset-4 {$page.url.pathname.split('/').at(-1) === link[1].id
					? 'text-xl text-accent underline'
					: 'text-lg text-primary'}"
			>
				<a href={link[1].link}>{link[0]}</a>
			</li>
			<span class="font-black last:hidden">/</span>
		{/each}
	</ul>
</div>
