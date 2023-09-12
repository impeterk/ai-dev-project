<script>
	import { Collection } from 'sveltefire';
	import { page } from '$app/stores';
	import { AngleDownSolid, AngleLeftSolid } from 'flowbite-svelte-icons';

	const { id, date } = $page.params;
</script>

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
	<Collection ref={`domain/${id}/dateofscan/${date}/scannedurls`} let:data>
		<ol>
			{#each data as url, index}
				<li class="border-y py-1">
					<div class="ml-4 flex content-center items-center text-lg">
						<div class="item-start flex gap-2">
							<p>{index + 1}.</p>
							<p>{url.url}</p>
						</div>
						<div class="ml-auto flex items-baseline gap-4">
							<p>{url.meta.title}</p>
							load more
							<AngleDownSolid class="h-4 w-4" />
							<div />
						</div>
					</div>
				</li>
			{/each}
		</ol>
	</Collection>
</section>
