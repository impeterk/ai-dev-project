<script>
	export let pages;
	let pagesArray = new Array(pages);
</script>

<nav aria-label="Page navigation example " class="flex w-full">
	<ul class=" text-md mx-auto inline-flex p-4 font-semibold">
		<li>
			<a
				href="#"
				class="ml-0 flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>Previous</a
			>
		</li>
		{#each pagesArray as page, index}
			<li>
				<a
					href="#"
					class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					>{index + 1}</a
				>
			</li>
		{/each}

		<li>
			<a
				href="#"
				class="flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>Next</a
			>
		</li>
	</ul>
</nav>
