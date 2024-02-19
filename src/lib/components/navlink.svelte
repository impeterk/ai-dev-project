<script>
	export let href;
	export let tooltip;
	import { page } from '$app/stores';
	import { Tooltip } from 'flowbite-svelte';

	$: activeUrl = $page.url.pathname;
</script>

<li class="h-24 p-3 list-none">
	<a
		{href}
		class="group flex items-center justify-center rounded-xl border-primary p-4 hover:bg-secondary hover:text-primary ${activeUrl ==
		href
			? ' border-y  bg-secondary text-primary '
			: ' text-secondary '}"
	>
		<span class="text-4xl">
			<slot />
		</span>
	</a>
	<Tooltip
		arrow={false}
		placement="bottom"
		defaultClass=""
		class="absolute w-max shrink-0 !bg-primary p-2 text-secondary outline outline-1 outline-secondary/50"
	>
		{tooltip}
	</Tooltip>
</li>
