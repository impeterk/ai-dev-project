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
	import Icon from '@iconify/svelte';

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
			<Icon icon="mdi:plus-circle-outline" width="32" />
		</a>
	</div>
	<section class="flex min-h-[750px] w-full flex-col">
		<header
			class="grid w-full grid-cols-6 items-center justify-items-center rounded-xl bg-gradient-to-r from-primary to-accent font-bold text-slate-100"
		>
			<p class="col-span-2 col-start-1 ml-12 justify-self-start">Name</p>
			<p>Last Scan</p>
			<p>status</p>
			<div class="relative col-span-2 col-start-5 ml-auto flex w-full items-center justify-end">
				<TableSearch
					innerDivClass="p-4"
					searchClass="relative"
					inputClass="bg-secondary text-primary p-1 pr-2 rounded-lg text-right"
					placeholder="Search for items"
				/>
			</div>
		</header>
		<ul class="devide-y w-full space-y-4 pt-12" role="list">
			{#each $domains as domain}
				<li
					class="group grid grid-cols-6 items-center justify-items-center overflow-hidden rounded-xl bg-base p-2 outline-1 outline-accent/50 hover:bg-accent/10 hover:outline"
				>
					<a
						href="/domain/{domain.id}"
						class="col-span-2 col-start-1 ml-4 justify-self-start p-4 text-left text-xl font-bold underline-offset-4 hover:underline"
					>
						{domain.name}
					</a>

					<div class="p-1 text-left text-primary">
						{#if domain.lastScan}
							<p class="text-lg font-semibold">
								{dateFormatter(domain.lastScan)}
							</p>
							<p>
								{timeFormatter(domain.lastScan)}
							</p>
						{/if}
					</div>

					<p
						class="w-1/2 shrink-0 rounded-lg px-2 py-1 text-center"
						class:bg-warning={domain.status == 'added'}
						class:bg-success={domain.status == 'finished'}
						class:bg-error={domain.status == 'aborted'}
						class:bg-secondary={domain.status == 'scanning'}
						class:bg-yellow-300={domain.status == 'evaluating'}
						class:bg-purple-200={domain.status == 'ai magic'}
					>
						{domain.status}
					</p>
					<button
						class="ml-auto flex items-center gap-2 rounded-xl px-4 py-2 outline-1 outline-primary hover:bg-secondary active:bg-secondary active:outline"
					>
						<p>See more</p>
						<Icon icon="mdi:chevron-down" class="text-3xl" />
					</button>
					<div class="flex w-full justify-center">
						<a
							href="/domain/{domain.id}"
							class="mx-auto flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-secondary"
						>
							<p class="font-medium">Inspect</p>
							<Icon icon="mdi:chevron-right" class="text-3xl" />
						</a>
					</div>
				</li>
			{/each}
		</ul>

		<!-- TODO loading state ---------------------------------------------------->
		{#if $domains.length === 0}
			<Spinner />
		{/if}

		<!-- Pagination component -->
		<div class="mt-auto">
			<Pagination />
		</div>
	</section>
</Main>
