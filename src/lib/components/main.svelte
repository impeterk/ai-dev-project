<script>
	import Breadcrumbs from './breadcrumbs.svelte';
</script>

<div class="h-[90px] w-full max-w-7xl">
	<h1 class="mt-20 px-40 text-5xl font-black text-primary">
		<slot name="title" />
	</h1>
	<div class="mt-4 px-40">
		<Breadcrumbs />
	</div>
</div>
<main class="shink-0 mx-20 mt-16 max-w-7xl xl:mx-auto">
	<slot name="header" />
	<section class="rounded-xl bg-secondary p-12">
		<slot />
	</section>
</main>
