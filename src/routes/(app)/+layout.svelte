<script>
	import Sidebar from '$lib/components/sidebar.svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
</script>

<div class="flex flex-row">
	<div class="sticky left-0 top-0 z-40 h-screen w-72 shrink-0 bg-gray-800 p-4">
		<Sidebar />
	</div>
	<div class="pt-20 w-full bg-slate-600">
		<slot />
	</div>
</div>
