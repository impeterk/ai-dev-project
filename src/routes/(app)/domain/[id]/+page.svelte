<script>
	export let data;
	let showDialog = false;
	import Main from '$lib/components/main.svelte';
	import { dateTimeFormatter } from '$lib/utils/dateFormatter.js';
	import { enhance } from '$app/forms';
	import Toggle from '$lib/components/toggle.svelte';
	import { breadcrumbs } from '$lib/store';
	import { page } from '$app/stores';
	import { beforeUpdate } from 'svelte';
	import Modal from "$lib/components/modal.svelte"
	import { Doc } from 'sveltefire';
	import Icon from '@iconify/svelte';
	import Card from './Card.svelte';
	$: ({ id, name, datesCollection, gsc, gscData } = data);
	$: startingUrl = `https://${name}`;
	$: aiToggle = {
		all: false,
		body: false,
		meta: false,
		social: false
	};

	$: {
		if (aiToggle.all) {
			aiToggle.body = aiToggle.meta = aiToggle.social = true;
		}
	}

	// Function to set 'aiToggle.all' based on the other checkboxes' state
	const updateAllState = () => {
		aiToggle.all = aiToggle.body && aiToggle.meta && aiToggle.social;
	};

	// breadcrumbs
	// TODO: rework to generate from server
	$: beforeUpdate(async () => {
		await $breadcrumbs.set(name, { id: name, link: $page.url.pathname });
	});

	let lastScanDate;
	$: if ($datesCollection[0]?.date) {
		const { date, time } = dateTimeFormatter($datesCollection[0]?.date);
		lastScanDate = `${date} ${time}`;
	}
	$: console.log($datesCollection);
</script>

<Main>
	<svelte:fragment slot="title">Domain Dashboard</svelte:fragment>
	<section class="w-full">
		<Modal></Modal>
		<section class="flex min-h-[1000px] flex-col">
			<!-- top header -->
			<ul class="text-md mt-5 min-h-[50px] w-full table-auto font-bold">
				<li
					class="flex w-full justify-between rounded-xl bg-gradient-to-r from-primary to-accent p-3 text-slate-100"
				>
					<span class="ml-2">{name}</span>
					<span>{lastScanDate}</span>
					<span>Scanned URLs: <span>{$datesCollection[0]?.totalPages ?? 0}</span></span>
					<span
						>Status: <span>
							<Doc ref="domain/{id}" let:data>
								<span>{data?.status}</span>
								<span slot="loading">Loading...</span>
							</Doc>
						</span></span
					>
				</li>
			</ul>

			<!-- Show dialog to set up starting Url for the scan e.g. domain/procuts -->
			{#if showDialog}
				<form
					method="POST"
					action="?/startScan"
					class="flex w-full content-center items-center justify-end gap-4 bg-slate-100 p-4"
					use:enhance={() => {
						return async ({ update }) => {
							await update();
							showDialog = false;
						};
					}}
				>
					<h3 class="text-xl font-medium">Starting Url</h3>
					<input hidden value={id} name="domainid" />
					<input hidden value={name} name="domainName" />
					<input bind:value={startingUrl} name="startingUrl" class="border-slate-600 p-1" />
					<!-- Start of toggles for AI suggestions -->
					<Toggle toggleName="aiAll" bind:toggleState={aiToggle.all} updateFn={null} label="All" />
					<Toggle
						toggleName="aiBody"
						bind:toggleState={aiToggle.body}
						updateFn={updateAllState}
						label="Body"
					/>
					<Toggle
						toggleName="aiMeta"
						bind:toggleState={aiToggle.meta}
						updateFn={updateAllState}
						label="Meta"
					/>
					<Toggle
						toggleName="aiSocial"
						bind:toggleState={aiToggle.social}
						updateFn={updateAllState}
						label="Social"
					/>
					<!-- End of toggles for AI suggestions -->
					<button type="submit" class=" mr-2 rounded bg-slate-600 px-2.5 py-1 text-slate-100"
						>Start New Scan</button
					>
				</form>
			{/if}

			<!-- 3 cards at the top -->
			<section class="grid min-h-[220px] grid-cols-3 grid-rows-1">
				<Card heading="Summary" />
				<Card heading="High Priority" borderColor="border-red-500" />
				<Card heading="AI Magic" borderColor="border-blue-400" />
			</section>
			<!-- graph section = Graph.js to be used -->
			<section class="grid min-h-[350px] grid-cols-3 grid-rows-1">
				<div class="col-span-2 mb-5 ml-3 mt-2 rounded-l-xl bg-white p-5">
					<h3 class="text-xl font-bold">Crawling History</h3>
					<graph class="m-5">Graph inserted here</graph>
				</div>
				<div class="col-span-1 mb-5 mt-2 rounded-r-xl bg-white p-5">
					<h3 class="text-xl font-bold">Details</h3>
					<graph class="m-5">upon hover</graph>
				</div>
			</section>
			<section class="ml-3 mt-5">
				<!-- scan table header -->
				<div class="text-md mt-5 min-h-[50px] w-full rounded-t-lg font-bold">
					<div class="flex items-center justify-between px-4">
						<h2 class="py-2 text-3xl font-bold text-primary">Scan Overview</h2>
						<button
							on:click={() => (showDialog = !showDialog)}
							class="button ml-auto inline-flex translate-y-1.5 gap-2 rounded-b-none bg-primary px-4 py-2 text-white group relative"
						>
						 <span class="transform group-hover:-translate-x-full group-hover:visible transition duration-500 ease-in-out  group-hover:opacity-100 absolute w-max bg-primary py-2 top-0 px-2 rounded-tl-lg" class:-translate-x-full={showDialog}
						 class:opacity-100={showDialog}
						 class:invisible={!showDialog}
						 class:visible={showDialog}
						 class:opacity-0={!showDialog}
						 class:translate-x-full={!showDialog}>New Scan</span>
							<Icon icon="mdi:plus-circle" class="text-2xl" />
						</button>
					</div>
					<header
						class="grid w-full grid-cols-6 justify-items-center rounded-xl bg-gradient-to-r from-primary to-meta p-3 text-slate-100"
					>
						<span class="ml-2">Date:</span>
						<span>Crawled URLs:</span>
						<span>URL:</span>
						<span>Status</span>
						<span>Impediments</span>
					</header>
					<!-- scan table line component -->
					<ul class="devide-y space-y-2 rounded-lg bg-white pt-4 shadow-lg">
						{#each $datesCollection as dateOfScan, index (index)}
							{@const { date, time } = dateTimeFormatter(dateOfScan.date)}
							<li
								class="border-primarylast:border-0 list__item group grid grid-cols-6 border-b py-1"
							>
								<span class="ml-2">{date} {time}</span>
								<span>{dateOfScan?.totalPages ?? 0}</span>
								<span
									>{dateOfScan.startingUrl?.replace('https://', '') || dateOfScan.startingUrl}</span
								>
								<span>-icon-</span>
								<span>13</span>
								<span class="flex w-full items-center justify-center px-4"
									><Icon icon="fa6-solid:file-csv" width="32" height="32" class="ml-auto" />
									<a href="/domain/{id}/{dateOfScan.id}" class="ml-auto hover:text-accent">
										<Icon icon="mdi:chevron-right" width="48" height="48" /></a
									>
								</span>
							</li>
						{/each}
					</ul>
				</div>
			</section>
		</section>
	</section>

	<!-- GSC -->
	{#if gscData}
		<section class="w-full">
			<div class="flex flex-col bg-slate-500 p-4 text-slate-100">
				<div class="flex items-center justify-between">
					<h3 class="ml-10 text-3xl font-semibold">Google search console data</h3>
					<label for="table-search" class="sr-only">GSC Data</label>
					<!-- <div class="relative mt-1">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<svg
							class="h-4 w-4 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
					</div>
					<input
						type="text"
						id="table-search"
						class="block w-80 rounded-lg border border-gray-300 bg-slate-200 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400"
						placeholder="Search for items"
					/>
				</div> -->
				</div>
				<div class="flex content-center justify-between px-8 pt-4">
					{#if gsc}
						<form method="POST" action="?/gsc" use:enhance>
							<input hidden value={name} name="domainName" />
							<input hidden value={id} name="domainId" />

							<button
								type="submit"
								class="rounded border border-slate-100 px-2.5 py-1 text-slate-100 hover:border-green-200 hover:bg-green-200 hover:text-slate-900"
								>Get GSC data</button
							>
						</form>
					{/if}
				</div>
			</div>

			<ol>
				{#each $gscData as result}
					<li class="flex w-full items-center p-2">
						<p class="text-lg">
							<span>{result.keys.first()}</span>
						</p>
						<p class="ml-8 text-lg">
							{result.impressions}
						</p>
						<p class="ml-8 text-lg">
							{result.clicks}
						</p>
						<p class="ml-8 text-lg">
							{result.ctr}
						</p>
						<p class="ml-8 text-lg">
							{result.position}
						</p>
					</li>
				{/each}
			</ol>
		</section>
	{/if}
</Main>
