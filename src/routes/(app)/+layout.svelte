<script>
	import Sidebar from '$lib/components/sidebar.svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
</script>

<div class="flex flex-row">
	<div class="sticky left-0 top-0 z-40 hidden h-screen w-72 shrink-0 bg-gray-800 p-4 lg:block">
		<Sidebar />
	</div>
	<div class="w-full pt-20">
		<slot />
	</div>
</div>
