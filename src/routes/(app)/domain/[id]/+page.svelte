<script>
	export let data;
	let showDialog = false;
	import Main from '$lib/components/main.svelte';
	import { dateTimeFormatter } from '$lib/utils/dateFormatter.js';
	import { enhance } from '$app/forms';
	import Spinner from '$lib/components/spinner.svelte';
	import Toggle from '$lib/components/toggle.svelte';
	import { breadcrumbs } from '$lib/store';
	import { page } from '$app/stores';
	import { beforeUpdate } from 'svelte';
	import { TableSearch } from 'flowbite-svelte';
	import { Doc } from 'sveltefire';
	import Icon from '@iconify/svelte';
	import Card from './Card.svelte';
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
		const { date, time } = dateTimeFormatter($datesCollection[0]?.date);
		lastScanDate = `${date} ${time}`;
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
						{#each $datesCollection as dateOfScan, index (index)}
							{@const { date, time } = dateTimeFormatter(dateOfScan.date)}
							<li class="border-primarylast:border-0 list__item group grid grid-cols-6 border-b">
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
</Main>
