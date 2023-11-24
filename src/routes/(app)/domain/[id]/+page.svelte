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
		await $breadcrumbs.set(name, { id, link: $page.url.pathname });
	});
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
					<span class="ml-2">domain_name.com</span>
					<span>9/25/2023<span>7:42 AM</span></span>
					<span>Scanned URLs:<span>279</span></span>
					<span>Status:<span>sign</span></span>
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
					class="mb-5 ml-3 mr-3 mt-5 rounded-xl border-4 border-red-700 bg-white p-5 hover:shadow"
				>
					<h3 class="text-xl font-bold">High Priority</h3>
					<ul class="ml-2 mt-2">
						<li class="list-inside list-disc">first thing</li>
						<li class="list-inside list-disc">second thing</li>
						<li class="list-inside list-disc">third thing</li>
					</ul>
				</div>
				<div
					class="mb-5 ml-3 mr-3 mt-5 rounded-xl border-4 border-blue-400 bg-white p-5 hover:shadow"
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
				<ul class="text-md mt-5 min-h-[50px] w-full table-auto font-bold">
					<li
						class="flex w-full justify-between rounded-xl bg-gradient-to-r from-primary to-accent p-3 text-slate-100"
					>
						<span class="ml-2">Date:</span>
						<span>Crawled URLs:</span>
						<span>URL:</span>
						<span>Status</span>
						<span>Impediments</span>
					</li>
				</ul>
				<div class="bg-white p-4">
					<!-- scan table line component -->
					<ul>
						<li class="flex justify-between rounded-xl bg-white p-3">
							<span class="ml-2">9/25/2023</span>
							<span>279</span>
							<span>/products</span>
							<span>-icon-</span>
							<span>13</span>
							<span>CSV</span>
						</li>
					</ul>
				</div>
			</section>
		</section>
	</section>
</Main>
