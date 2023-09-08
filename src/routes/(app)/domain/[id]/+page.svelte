<script>
	import { Collection } from 'sveltefire';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	async function handleBack() {
		goto('/');
	}
</script>

<section class="w-full">
	<button on:click={handleBack}>Back</button>
	<Collection ref={`domain/${$page.params.id}/dateofscan`} let:data let:count>
		<div class="mt-20 w-full rounded-lg bg-slate-300/60">
			<div class="flex items-center justify-between rounded-t-lg bg-slate-500 p-4 text-slate-100">
				<p class="ml-10 text-2xl font-semibold">
					Domain {$page.url.pathname.split('/').at(-1)}
				</p>
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
			<table class="w-full">
				<tbody class="pt-10">
					{#each data as domain, index}
						<tr class="flex w-full items-center p-2">
							<td class="ml-4 w-8">{index + 1}.</td>
							<td class="text-lg">{new Date(parseInt(domain.id))}</td>
							<td class="ml-auto mr-4">
								<a
									href="{$page.url.pathname}/{domain.id}"
									type="button"
									class=" rounded-lg border border-gray-300 bg-white px-2 py-1 text-lg font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
									>Continue</a
								></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div slot="loading">
			<Spinner />
		</div>
	</Collection>
</section>
