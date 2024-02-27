<script>
	export let toggleState;
	export let toggleName;
	export let updateFn;
	export let label = 'Toggle';
	export let styling;
</script>

<label class="relative inline-flex cursor-pointer items-center rounded-lg p-2 {styling}">
	<input name={toggleName} type="checkbox" class="peer sr-only" bind:value={toggleState} bind:checked={toggleState} on:change={updateFn} />
	<div
		class="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[10px] after:top-[10px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-600 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-purple-800"
	/>
	<span class="ml-3 text-sm font-medium">{label}</span>
</label>
