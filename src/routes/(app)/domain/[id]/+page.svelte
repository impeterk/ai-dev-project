<script>
	export let data;
	let showDialog = false;
	import Main from '$lib/components/main.svelte';
	import { dateFormatter, timeFormatter } from '$lib/utils/dateFormatter.js';
	import { enhance } from '$app/forms';
	import Spinner from '$lib/components/spinner.svelte';
	import Toggle from '$lib/components/toggle.svelte';
	import { breadcrumbs } from '$lib/store';

	import { page } from '$app/stores';
	import { beforeUpdate } from 'svelte';
	$: ({ id, name, datesCollection, gsc, gscData} = data);
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
		await $breadcrumbs.set(name, { id, link: $page.url.pathname });
	});
</script>

<Main>
	<svelte:fragment slot="title">Domain Dashboard</svelte:fragment>
	<section class="w-full">
		<div class="flex flex-col bg-slate-500 p-4 text-slate-100">
			<div class="flex items-center justify-between">
				<h3 class="ml-10 text-3xl font-semibold">
					{name}
				</h3>
				<label for="table-search" class="sr-only">Search</label>
				<div class="relative mt-1">
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
				</div>
			</div>
			<div class="flex content-center justify-between px-8 pt-4">
				<p>date of scan</p>
				<p>scanned pages</p>
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
				<button
					class="rounded bg-slate-200 px-2.5 py-1 text-slate-900 hover:bg-green-200"
					on:click={() => (showDialog = !showDialog)}>New scan</button
				>
			</div>
		</div>
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

		<ol>
			{#each $datesCollection as date, index}
				<li class="flex w-full items-center p-2">
					<p class="ml-4 w-8">{index + 1}.</p>
					<p class="text-lg">
						<span>{dateFormatter(date.id)}</span>
						<span>{timeFormatter(date.id) || ''}</span>
					</p>
					<p class="ml-8 text-lg">
						{date.totalPages || 'In progress '}
					</p>
					<p class="ml-auto mr-4">
						<a
							href="/domain/{id}/{date.id}"
							type="button"
							class=" rounded-lg border border-gray-300 bg-white px-2 py-1 text-lg font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
							>Continue</a
						>
					</p>
				</li>
			{/each}
		</ol>
		{#if $datesCollection.length === 0}
			<Spinner />
		{/if}
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
