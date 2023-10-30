<script>
	import Sidebar from '$lib/components/sidebar.svelte';
</script>

<div class="flex flex-row">
	<div class="sticky left-0 top-0 z-40 h-screen shrink-0">
		<Sidebar />
	</div>
	<div class="mx-auto w-full max-w-7xl">
		<slot />
	</div>
</div>
