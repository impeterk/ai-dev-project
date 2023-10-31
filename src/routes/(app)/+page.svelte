<script>
	// imports
	import {
		SearchOutline,
		CirclePlusSolid,
		AngleDownSolid,
		AngleRightSolid
	} from 'flowbite-svelte-icons';
	import { TableSearch } from 'flowbite-svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import Spinner from '$lib/components/spinner.svelte';
	import Main from '$lib/components/main.svelte';
	import { currentCollection } from '$lib/store';
	import { dateFormatter, timeFormatter } from '$lib/utils/dateFormatter';
	import { breadcrumbs } from '$lib/store';

	// domains returned from load function
	// $: ({ domains } = data);

	$: domains = $currentCollection;

	$breadcrumbs.clear();
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
	<section class="flex min-h-[750px] flex-col">
		<table class=" w-full table-auto">
			<thead class="w-full rounded-xl bg-gradient-to-r from-primary to-accent text-slate-100">
				<tr>
					<th scope="col" class="rounded-l-xl text-left"><p class="ml-12">Name</p></th>
					<th scope="col" class="text-left">Last Scan</th>
					<th scope="col">Status</th>
					<th scope="col" colspan="2" class="rounded-r-xl">
						<div class="relative ml-auto flex w-full items-center justify-end">
							<TableSearch
								innerDivClass="p-4"
								searchClass="relative"
								inputClass="bg-secondary text-primary p-1 pr-2 rounded-lg text-right"
								placeholder="Search for items"
							/>
						</div>
					</th>
				</tr>
			</thead>
			<div class="pt-12" />
			<tbody>
				{#each $domains as domain}
					<div class="p-2" />
					<tr
						class="group overflow-hidden rounded-xl bg-base outline-1 outline-accent/50 hover:bg-accent/10 hover:outline"
					>
						<th scope="row" class=" rounded-l-xl p-4 text-left text-xl">
							<a href="/domain/{domain.id}" class="ml-4 underline-offset-4 hover:underline">
								{domain.name}
							</a></th
						>

						<td class="text-left text-primary">
							{#if domain.lastScan}
								<div class="p-1">
									<p class="text-lg font-semibold">
										{dateFormatter(domain.lastScan)}
									</p>
									<p>
										{timeFormatter(domain.lastScan)}
									</p>
								</div>
							{/if}</td
						>
						<td>
							<p
								class="rounded-lg px-2 py-1 text-center"
								class:bg-warning={domain.status == 'added'}
								class:bg-success={domain.status == 'finished'}
								class:bg-error={domain.status == 'aborted'}
								class:bg-secondary={domain.status == 'scanning'}
								class:bg-yellow-300={domain.status == 'evaluating'}
						    class:bg-purple-200={domain.status == 'ai magic'}
							>
								{domain.status}
							</p>
						</td>
						<td>
							<button
								class="ml-auto flex items-center gap-2 rounded-xl px-4 py-2 outline-1 outline-primary hover:bg-secondary active:bg-secondary active:outline"
							>
								<p>See more</p>
								<AngleDownSolid size="sm" />
							</button>
						</td>
						<td class="rounded-r-xl">
							<div class="flex w-full justify-center">
								<a
									href="/domain/{domain.id}"
									class="mx-auto flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-secondary"
								>
									<p class="font-medium">Inspect</p>
									<AngleRightSolid size="sm" />
								</a>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<!-- TODO loading state ---------------------------------------------------->
		{#if $domains.length === 0}
			<Spinner />
		{/if}

		<!-- Pagination component -->

		{#if $domains.length !== 0}
			<div class="mt-auto">
				<Pagination />
			</div>
		{/if}
	</section>
</Main>
