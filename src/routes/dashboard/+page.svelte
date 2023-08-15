<script>
	import { placeholder } from '$lib/store.js';
	export let form;
	let url;
	let count = 10;

	$: array = form?.arrayOfUrls;
</script>

<section class="container mx-auto flex h-screen max-w-5xl flex-col">
	<h2 class="mt-10 text-center text-3xl font-semibold text-slate-900">URL To scan</h2>
	<div class="w-full rounded-xl bg-slate-300/60">
		<form class="mx-auto mt-2 flex w-full gap-4 p-8" method="POST">
			<div class="flex w-full flex-col">
				<label class="text-medium mb-2 font-medium" for="url">URL </label>
				<input
					id="url"
					bind:value={url}
					name="url"
					placeholder={$placeholder.url}
					type="text"
					class="rounded-md border p-1"
				/>
			</div>

			<div class="flex flex-col">
				<label for="count" class="mb-2 font-medium"> count</label>
				<input
					id="count"
					bind:value={count}
					name="count"
					type="number"
					class="w-16 rounded-md border p-1"
				/>
			</div>
			<button class="w-48 self-end rounded-md bg-slate-600 px-2 py-1 font-medium text-slate-100"
				>Scan</button
			>
		</form>
		{#if array}
			<ul class="m-4 overflow-hidden rounded-xl p-2">
				{#each array as url, i}
					<li
						key={i}
						class={`${
							i % 2 ? 'bg-slate-300 text-slate-900' : 'text-slate-800'
						} mx-2 flex p-2 text-lg`}
					>
						<p>
							{i + 1 + '.'}
						</p>
						<p class="mr-2 w-full text-right">
							{url}
						</p>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>
