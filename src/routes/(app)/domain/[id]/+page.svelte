<script>
	import { Collection, collectionStore } from 'sveltefire';
	import { orderBy, query, collection } from 'firebase/firestore';
	import { firestore } from '$lib/firebase';
	import { page } from '$app/stores';
	const { id } = $page.params;
	let datesRef = collection(firestore, `domain/${id}/dateofscan`);
	let ordredQuery = query(datesRef, orderBy('id', 'desc'));
	// const dates = collectionStore(firestore, ordredQuery);
</script>

<section class="w-full">
	<div class="flex flex-col bg-slate-500 p-4 text-slate-100">
		<div class="flex items-center justify-between">
			<h3 class="ml-10 text-3xl font-semibold">
				{id}
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
			<form method="POST">
				<input hidden value={id} name="domainid" />
				<button class="rounded bg-slate-200 px-2.5 py-1 text-slate-900 hover:bg-green-200"
					>New scan</button
				>
			</form>
		</div>
	</div>
	<Collection ref={`domain/${id}/dateofscan`} let:data>
		<ol>
			{#each data as date, index}
				<li class="flex w-full items-center p-2">
					<p class="ml-4 w-8">{index + 1}.</p>
					<p class="text-lg">{new Date(parseInt(date.id))}</p>
					<p class="ml-8 text-lg">
						{#if date.totalPages}
							{date.totalPages}
						{/if}
					</p>
					<p class="ml-auto mr-4">
						<a
							href="{$page.url.pathname}/{date.id}"
							type="button"
							class=" rounded-lg border border-gray-300 bg-white px-2 py-1 text-lg font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
							>Continue</a
						>
					</p>
				</li>
			{/each}
		</ol>
	</Collection>
</section>
