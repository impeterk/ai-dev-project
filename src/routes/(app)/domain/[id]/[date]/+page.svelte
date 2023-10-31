<script>
	import Main from '$lib/components/main.svelte';
	// set main title(h1) on the page

	import { page } from '$app/stores';
	import { AngleDownSolid, AngleLeftSolid } from 'flowbite-svelte-icons';
	import Pagination from '$lib/components/pagination.svelte';
	import Spinner from '$lib/components/spinner.svelte';
	import { currentCollection, breadcrumbs } from '$lib/store';
	import { onDestroy, beforeUpdate } from 'svelte';

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
		<div class="flex flex-col bg-slate-500 p-4 text-slate-100">
			<div class="mx-4 flex items-center justify-between">
				<div class="flex items-center gap-8">
					<a href="/domain/{id}">
						<AngleLeftSolid class="h-8 w-8" />
					</a>
					<h3 class="text-3xl font-semibold">
						{id}
					</h3>
				</div>
				<h3 class="ml-10 text-3xl font-semibold">
					{date}
				</h3>
			</div>
		</div>
		{#if $results.length === 0}
			<Spinner />
		{/if}
		<ol class="h-[650px]">
			{#each $results as url, index}
				<li class="border-b py-1">
					<button
						class="mx-4 block w-full"
						on:click={() => (expanded = expanded === index ? null : index)}
					>
						<div class="w-max-content text-lg">
							<div class="float flex gap-2">
								<AngleDownSolid class="float-left my-auto h-4 w-4" />
								<p>{url.url}</p>
							</div>
							<div />
						</div>
					</button>
				</li>
				{#if expanded === index}
					<div class="ml-4 mt-2">
						{#if url.issues}
							{#if url.issues.meta.title}
								<div class="block">
									Title: {url.issues.meta.title}
								</div>
							{/if}
							{#if url.issues.meta.description}
								<div class="block">
									Description: {url.issues.meta.description}
								</div>
							{/if}
							{#if url.issues.meta.canonical}
								<div class="block">
									Canonical: {url.issues.meta.canonical}
								</div>
							{/if}
							{#if url.issues.social.title}
								<div class="block">
									OG title: {url.issues.social.title}
								</div>
							{/if}
							{#if url.issues.social.description}
								<div class="block">
									OG description: {url.issues.social.description}
								</div>
							{/if}
							{#if url.issues.social.image}
								<div class="block">
									OG image: {url.issues.social.image}
								</div>
							{/if}
							{#if url.issues.schema}
								<div class="block">Schema: {url.issues.schema}</div>
							{/if}
							{#if url.suggestions}
								<div class="block">Suggestions title: {url.suggestions.meta.title}</div>
								<div class="block">Suggestions description: {url.suggestions.meta.description}</div>
							{/if}
						{/if}
					</div>
				{/if}
			{/each}
		</ol>

		<Pagination />
	</section>
</Main>
