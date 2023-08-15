<script>
	export let form;
	let domain;
	let success = false;

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
	$: {
		console.log(crawlResult);
	}
</script>

<div class="flex h-screen w-full flex-col rounded-lg bg-gray-300 p-6 shadow">
	<div class="mb-8">
		<div class="mb-4 text-center text-lg font-bold">Simple Form</div>
		<div class="mb-4 text-center text-sm">Crawl a domain</div>
		<form action="" method="post" class="flex flex-col">
			<label class="font-meduim text-sm uppercase"
				>Specify the domain
				<input bind:value={domain} name="domain" class="mb-2 w-full rounded border p-1" />
			</label>
			<button
				disabled={!domain}
				class={`${
					domain ? 'bg-slate-900' : 'bg-slate-900/60'
				} mx-auto mt-2 w-1/2 rounded-md p-2 text-lg font-semibold text-slate-100`}>Submit</button
			>
		</form>
	</div>

	{#if crawlResult}
		{#each Object.keys(crawlResult.items) as item}
			<div class="mb-8 flex w-full flex-col rounded-lg bg-slate-500/60 p-6 text-center shadow">
				<p class="font-semiblod text-slate-900">{item}: {crawlResult.items[item].url}</p>
			</div>
		{/each}
	{/if}
</div>
