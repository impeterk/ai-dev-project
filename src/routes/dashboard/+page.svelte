<script>
	// imports
	import { placeholder } from '$lib/store.js';
	import { enhance } from '$app/forms';
	import Spinner from '../../lib/Spinner.svelte';
	import Pagination from '../../lib/Pagination.svelte';
	export let form;

	let domain;
	let success = false;
	let fetching = false;

	$: {
		if (form && form.success) {
			success = true;
			setTimeout(() => {
				success = false;
			}, 3000);
		} else {
			console.error('Failed to submit form');
		}
	}

	$: crawlResult = form?.crawlResult;
</script>

<section class="container mx-auto flex min-h-screen max-w-5xl flex-col">
	<h2 class="mt-10 text-center text-3xl font-semibold text-slate-900">URL To scan</h2>
	<div class="w-full rounded-xl bg-slate-300/60">
		<form
			class="mx-auto mt-2 flex w-full gap-4 p-8"
			method="POST"
			use:enhance={() => {
				fetching = true;

				return async ({ update }) => {
					await update();
					fetching = false;
				};
			}}
		>
			<div class="flex w-full flex-col">
				<label class="text-medium mb-2 font-medium" for="url">URL </label>
				<input
					id="domain"
					bind:value={domain}
					name="domain"
					placeholder={$placeholder.url}
					type="text"
					class="rounded-md border p-1"
				/>
			</div>

			<button class="w-48 self-end rounded-md bg-slate-600 px-2 py-1 font-medium text-slate-100"
				>Scan</button
			>
		</form>
		{#if fetching}
			<Spinner />
		{/if}
		{#if crawlResult}
			<ul class="m-4 overflow-hidden rounded-xl p-2">
				{#each crawlResult.items as item, index}
					<li
						key={index}
						class="mx-2 flex p-2 text-lg text-slate-800 even:bg-slate-300 even:text-slate-900"
					>
						<p>
							{index + 1 + '.'}
						</p>
						<p class="mr-2 w-full text-right">
							{item.url}
						</p>
					</li>
				{/each}
			</ul>
		{/if}
		<Pagination pages={3} />
	</div>
</section>
