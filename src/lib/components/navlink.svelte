<script>
	export let href;
	export let tooltip;
	import { page } from '$app/stores';
	import { Tooltip } from 'flowbite-svelte';

	$: activeUrl = $page.url.pathname;
</script>

<li class="h-24 p-3">
	<a
		{href}
		class="group flex h-full w-full items-center justify-center rounded-xl border-primary p-4 hover:bg-secondary hover:text-primary ${activeUrl ==
		href
			? ' border-y  bg-secondary text-primary '
			: ' text-secondary '}"
	>
		<div class="h-3/4 w-3/4">
			<slot />
		</div>
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
