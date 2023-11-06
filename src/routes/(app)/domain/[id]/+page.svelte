<script>
	export let data;
	let showDialog = false;
	import Main from '$lib/components/main.svelte';
	import { dateFormatter, timeFormatter } from '$lib/utils/dateFormatter.js';
	import { enhance } from '$app/forms';
	import Spinner from '$lib/components/spinner.svelte';
	import { breadcrumbs } from '$lib/store';

	import { page } from '$app/stores';
	import { beforeUpdate } from 'svelte';
	import { TableSearch } from 'flowbite-svelte';
	$: ({ id, name, datesCollection } = data);
	$: startingUrl = `https://${name}`;

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
			<table class="min-h-[50px] w-full table-auto">
				<thead class="w-full rounded-xl bg-gradient-to-r from-primary to-accent text-slate-100">
					<tr>
						<th scope="col" class="rounded-l-xl text-left"><p class="ml-12">domain_name.com</p></th>
						<th scope="col" class="text-left"
							>9/25/2023 <span class="ml-3 text-sm font-normal">7:42 AM</span></th
						>
						<th scope="col">Scanned URLs: 279</th>
						<th scope="col" class="rounded-r-xl">Status</th>
					</tr>
				</thead>
			</table>
			<section class="grid min-h-[220px] grid-cols-3 grid-rows-1">
				<div class="mb-5 ml-3 mr-3 mt-5 rounded-xl bg-white p-5">
					<h3 class="text-xl font-bold">Summary</h3>
					<ul class="ml-2 mt-2">
						<li class="list-inside list-disc">first thing</li>
						<li class="list-inside list-disc">second thing</li>
						<li class="list-inside list-disc">third thing</li>
					</ul>
				</div>
				<div class="mb-5 ml-3 mr-3 mt-5 rounded-xl border-4 border-red-700 bg-white p-5">
					<h3 class="text-xl font-bold">High Priority</h3>
					<ul class="ml-2 mt-2">
						<li class="list-inside list-disc">first thing</li>
						<li class="list-inside list-disc">second thing</li>
						<li class="list-inside list-disc">third thing</li>
					</ul>
				</div>
				<div class="mb-5 ml-3 mr-3 mt-5 rounded-xl border-4 border-blue-400 bg-white p-5">
					<h3 class="text-xl font-bold">AI Magic</h3>
					<ul class="ml-2 mt-2">
						<li class="list-inside list-disc">first thing</li>
						<li class="list-inside list-disc">second thing</li>
						<li class="list-inside list-disc">third thing</li>
					</ul>
				</div>
			</section>
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
				<div class="text-md mt-5 min-h-[50px] w-full table-auto font-bold">
					<ul
						class="flex w-full justify-between rounded-xl bg-gradient-to-r from-primary to-accent p-3 text-slate-100"
					>
						<li class="ml-2">Date:</li>
						<li>Crawled URLs:</li>
						<li>URL:</li>
						<li>Status</li>
						<li>Impediments</li>
						<li />
					</ul>
				</div>
				<div class="p-4 bg-white">
					<div>
						<ul class="flex justify-between rounded-xl bg-white p-3">
							<li class="ml-2">9/25/2023</li>
							<li>279</li>
							<li>/products</li>
							<li>-icon-</li>
							<li>13</li>
							<li>CSV</li>
						</ul>
					</div>
					<div>
						<ul class="flex justify-between rounded-xl bg-white p-3">
							<li class="ml-2">9/25/2023</li>
							<li>279</li>
							<li>/products</li>
							<li>-icon-</li>
							<li>13</li>
							<li>CSV</li>
						</ul>
					</div>
					<div>
						<ul class="flex justify-between rounded-xl bg-white p-3">
							<li class="ml-2">9/25/2023</li>
							<li>279</li>
							<li>/products</li>
							<li>-icon-</li>
							<li>13</li>
							<li>CSV</li>
						</ul>
					</div>
				</div>
			</section>
		</section>
	</section>
</Main>
