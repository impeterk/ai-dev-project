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
	import { TableSearch } from 'flowbite-svelte';
	import { Doc } from 'sveltefire';
	import Icon from '@iconify/svelte';
	$: ({ id, name, datesCollection } = data);
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
		lastScanDate = `${dateFormatter($datesCollection[0]?.date)} ${timeFormatter(
			$datesCollection[0]?.date
		)}`;
	}
	$: console.log($datesCollection);
</script>

<Main>
	<svelte:fragment slot="title">Domain Dashboard</svelte:fragment>
	<section class="w-full">
		<section class="flex min-h-[1000px] flex-col">
			<!-- top header -->
			<ul class="text-md mt-5 min-h-[50px] w-full table-auto font-bold">
				<li
					class="flex w-full justify-between rounded-xl bg-gradient-to-r from-primary to-accent p-3 text-slate-100"
				>
					<span class="ml-2">{name}</span>
					<span>{lastScanDate}</span>
					<span>Scanned URLs: <span>{$datesCollection[0]?.totalPages}</span></span>
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
			<!-- 3 cards at the top -->
			<section class="grid min-h-[220px] grid-cols-3 grid-rows-1">
				<div class="mb-5 ml-3 mr-3 mt-5 rounded-xl bg-white p-5">
					<h3 class="text-xl font-bold">Summary</h3>
					<ul class="ml-2 mt-2">
						<li class="list-inside list-disc">first thing</li>
						<li class="list-inside list-disc">second thing</li>
						<li class="list-inside list-disc">third thing</li>
					</ul>
				</div>
				<div
					class="mb-5 ml-3 mr-3 mt-5 rounded-xl border-4 border-red-700 bg-white p-5 hover:shadow-lg"
				>
					<h3 class="text-xl font-bold">High Priority</h3>
					<ul class="ml-2 mt-2">
						<li class="list-inside list-disc">first thing</li>
						<li class="list-inside list-disc">second thing</li>
						<li class="list-inside list-disc">third thing</li>
					</ul>
				</div>
				<div
					class="mb-5 ml-3 mr-3 mt-5 rounded-xl border-4 border-blue-400 bg-white p-5 hover:shadow-lg"
				>
					<h3 class="text-xl font-bold">AI Magic</h3>
					<ul class="ml-2 mt-2">
						<li class="list-inside list-disc">first thing</li>
						<li class="list-inside list-disc">second thing</li>
						<li class="list-inside list-disc">third thing</li>
					</ul>
				</div>
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
				<h2 class="text-3xl font-bold">Scan Overview</h2>
				<!-- scan table header -->
				<div class="text-md mt-5 min-h-[50px] w-full space-y-4 rounded-t-lg bg-white font-bold">
					<header
						class="grid w-full grid-cols-6 justify-items-center rounded-xl bg-gradient-to-r from-primary to-accent p-3 text-slate-100"
					>
						<span class="ml-2">Date:</span>
						<span>Crawled URLs:</span>
						<span>URL:</span>
						<span>Status</span>
						<span>Impediments</span>
					</header>
					<!-- scan table line component -->
					<ul class="devide-y">
						{#each $datesCollection as date, index (index)}
							<li
								class="border-primarylast:border-0 group grid w-full grid-cols-6 items-center justify-items-center rounded-xl border-b p-3 py-4 outline-1 outline-primary/50 hover:bg-secondary/70 hover:outline"
							>
								<span class="ml-2">{dateFormatter(date.date)} {timeFormatter(date.date)}</span>
								<span>{date?.totalPages ?? 0}</span>
								<span>{date.startingUrl?.replace('https://', '') || date.startingUrl}</span>
								<span>-icon-</span>
								<span>13</span>
								<span class="flex w-full items-center justify-center px-4"
									><Icon icon="fa6-solid:file-csv" width="32" height="32" class="ml-auto" />
									<a href="/domain/{id}/{date.id}" class="ml-auto hover:text-accent">
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
</Main>
