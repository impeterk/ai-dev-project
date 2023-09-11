<script>
	// imports
	import { Collection } from 'sveltefire';
	import { SearchOutline } from 'flowbite-svelte-icons';
	export let form;
</script>

<section>
	<div class=" flex items-center justify-between bg-slate-500 px-8 py-4 text-slate-100">
		<h3 class="text-2xl font-semibold">Domains</h3>
		<div class="flex items-center gap-4" >
			<label for="table-search" class="sr-only">Search</label>
			<div class="relative">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<SearchOutline class="text-gray-400" />
				</div>
				<input
					type="text"
					id="table-search"
					class="block w-80 rounded-lg border border-gray-300 bg-slate-200 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400"
					placeholder="Search for items"
				/>
			</div>
			<a href="/newdomain" class="rounded bg-gray-800 px-2 py-1 hover:bg-gray-600">Add Domain</a>
		</div>
	</div>
	<ol class="w-full pt-0" >
		<!-- TODO loading state ---------------------------------------------------->
		<Collection ref={'domain'} let:data>
			{#each data as domain, index}
				<li
					class="group flex w-full items-center border-y py-1 bg-white hover:border-slate-400"
				>
					<p class="ml-4 w-8" >{index + 1}.</p>
					<p class="text-lg">{domain.id}</p>
					<div class="ml-auto flex items-center gap-12">
						<p
							class="border-inherrit w-20 rounded border px-2 text-center text-sm"
							class:bg-yellow-200={domain.status == 'added'}
							class:bg-green-200={domain.status == 'finished'}
							class:bg-red-200={domain.status == 'aborted'}
							class:bg-blue-200={domain.status == 'scanning'}
						>
							{domain.status}
						</p>
						<a
							href="domain/{domain.id}"
							type="button"
							class=" mr-6 rounded-lg border border-gray-300 bg-white px-2 py-1 text-lg font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
							>Continue</a
						>
					</div>
				</li>
			{/each}
			<p slot="loading" class="absolute text-4xl">Loading...</p>
		</Collection>
		<!--TODO Error state------------------------------------------------->
	</ol>
</section>
