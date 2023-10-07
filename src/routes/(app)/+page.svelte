<script>
	// imports
	import { SearchOutline, CirclePlusSolid } from 'flowbite-svelte-icons';
	import Pagination from '$lib/components/pagination.svelte';
	import Spinner from '$lib/components/spinner.svelte';
	import Main from '$lib/components/main.svelte';
	// data props
	export let data;

	// domains returned from load function
	$: ({ domains } = data);
</script>

<Main>
	<svelte:fragment slot="title">Domain Overview</svelte:fragment>
	<div class="flex w-full justify-end" slot="header">
		<a
			href="/newdomain"
			class="mr-20 flex items-center gap-2 rounded-t-xl bg-primary px-4 py-2 text-xl font-bold text-secondary outline-offset-2 transition delay-100 duration-300 ease-in-out hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:outline"
			>Add Domain
			<CirclePlusSolid size="sm" />
		</a>
	</div>
	<section>
		<div
			class="flex items-center justify-between rounded-2xl bg-gradient-to-r from-primary to-accent p-2 text-slate-100"
		>
			<h3 class="text-xl font-semibold">Domains</h3>
			<div class="flex items-center gap-4">
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
			</div>
		</div>
		<ol class="h-[650px] min-h-[400px] w-full pt-8">
			<!-- TODO loading state ---------------------------------------------------->
			{#if $domains.length === 0}
				<Spinner />
			{/if}
			{#each $domains as domain}
				<li class="group my-4 flex w-full items-center border bg-white p-4 hover:border-slate-400">
					<p class="text-lg">{domain.name}</p>
					<div class="ml-auto flex items-center gap-12">
						<p
							class="border-inherrit w-20 rounded border px-2 text-center text-sm"
							class:bg-warning={domain.status == 'added'}
							class:bg-success={domain.status == 'finished'}
							class:bg-error={domain.status == 'aborted'}
							class:bg-secondary={domain.status == 'scanning'}
							class:bg-yellow-300={domain.status == 'evaluating'}
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
			<!--TODO Error state------------------------------------------------->
		</ol>
		<!-- Pagination component -->

		{#if $domains.length !== 0}
			<Pagination />
		{/if}
	</section>
</Main>
