<script>
	import Main from '$lib/components/main.svelte';
	// set main title(h1) on the page

	import { page } from '$app/stores';
	import { AngleDownSolid, AngleLeftSolid } from 'flowbite-svelte-icons';
	import Pagination from '$lib/components/pagination.svelte';
	import Spinner from '$lib/components/spinner.svelte';
	import { currentCollection, breadcrumbs } from '$lib/store';
	import { onDestroy, beforeUpdate } from 'svelte';
	import { TableSearch } from 'flowbite-svelte';

	const { id, date } = $page.params;
	let expanded = null;

	$: results = $currentCollection;

	// breadcrumbs
	// TODO: rework to generate from server
	$: beforeUpdate(async () => {
		await $breadcrumbs.set(date, { id: date, link: $page.url.pathname });
	});
	$: onDestroy(async () => {
		await $breadcrumbs.delete(date);
	});
</script>

<Main>
	<svelte:fragment slot="title">URL Results</svelte:fragment>
	<section class="">
		<header
			class="grid grid-cols-3 items-center rounded-xl bg-gradient-to-r from-primary to-accent px-4 text-slate-100"
		>
			<h3 class="text-3xl font-semibold">
				{id}
			</h3>
			<div class="flex w-1/2 items-center justify-between justify-self-center">
				<h3>Impediments</h3>
				<h3>15</h3>
			</div>
			<div class="relative flex w-full items-center justify-end">
				<TableSearch
					searchClass="relative"
					inputClass="bg-secondary text-primary p-1 pr-2 rounded-lg text-right"
					placeholder="Search for items"
				/>
			</div>
		</header>
		<ol class="min-h-[650px] space-y-4 pt-12">
			{#if $results.length === 0}
				<Spinner />
			{/if}
			{#each $results as url, index}
				<li
					class="flex w-full items-center justify-between rounded-lg bg-white p-4 text-xl text-primary shadow-lg"
				>
					<p>{url.url.replace('https://', '')}</p>
					<div class="inline w-fit space-x-12">
						<button class="" on:click={() => (expanded = expanded === index ? null : index)}>
							<div class="flex items-center gap-2">
								See more
								<AngleDownSolid class="float-left my-auto h-4 w-4" />
							</div>
						</button>
						<button class="rounded-xl bg-primary px-3 py-1 text-secondary"> Inspect </button>
					</div>
				</li>
				{#if expanded === index}
					<div class="w-full">
						<header class=" mx-4 flex w-full px-2 text-2xl font-bold text-white">
							<button class="-mx-1 rounded-t-lg bg-body px-6 py-2 hover:z-50">Body</button>
							<button class="-mx-1 rounded-t-lg bg-meta px-6 py-2 hover:z-50">Meta</button>
							<button class="-mx-1 rounded-t-lg bg-social px-6 py-2 hover:z-50">Social</button>
							<button class="-mx-1 rounded-t-lg bg-schema px-6 py-2 hover:z-50">Schema</button>
						</header>
						<div class="rounded-xl bg-white px-2 py-4 shadow-lg">
							<header class="mx-4 grid grid-cols-3 gap-4 border-b pt-4 text-xl font-bold">
								<p>Headlines</p>
								<p>Evaluation</p>
								<p>AI Magic</p>
							</header>
							<div class="mx-4 grid grid-cols-3 gap-4">
								<ul class="col-span-1 col-start-1 my-4 rounded-xl bg-secondary p-4">
									{#if url.issues}
										{#if url.issues.meta.title}
											<li class="block">
												Title: {url.issues.meta.title}
											</li>
										{/if}
										{#if url.issues.meta.description}
											<li class="block">
												Description: {url.issues.meta.description}
											</li>
										{/if}
										{#if url.issues.meta.canonical}
											<li class="block">
												Canonical: {url.issues.meta.canonical}
											</li>
										{/if}
										{#if url.issues.social.title}
											<li class="block">
												OG title: {url.issues.social.title}
											</li>
										{/if}
										{#if url.issues.social.description}
											<li class="block">
												OG description: {url.issues.social.description}
											</li>
										{/if}
										{#if url.issues.social.image}
											<li class="block">
												OG image: {url.issues.social.image}
											</li>
										{/if}
										{#if url.issues.schema}
											<div class="block">Schema: {url.issues.schema}</div>
										{/if}
										{#if url.suggestions}
											<div class="block">Suggestions title: {url.suggestions.meta.title}</div>
											<div class="block">
												Suggestions description: {url.suggestions.meta.description}
											</div>
										{/if}
									{/if}
								</ul>
								<ul class="col-span-1 col-start-2 my-4 rounded-xl bg-[#FAD4EF] p-4" />
								<ul class="col-span-1 col-start-3 my-4 rounded-xl bg-[#E0F4FF] p-4" />
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</ol>
		<Pagination />
	</section>
</Main>
