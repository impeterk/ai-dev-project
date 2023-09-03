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
	$: isSuccess = form?.success;
</script>

<div class="flex h-screen w-full flex-col p-3">
	<div class="mb-8 rounded-lg bg-gray-300 p-3 shadow">
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

	{#if crawlResult && isSuccess}
		<p class="mb-4">Count: {crawlResult.items.length}</p>
		{#each Object.keys(crawlResult.items) as item}
			<div class="mb-4 flex w-full flex-col rounded-lg bg-slate-400/60 p-2 text-left shadow">
				<!-- META -->
				<p class="font-semiblod mb-3 text-slate-900"><code>{crawlResult.items[item].url}</code></p>
				<p>Title:</p>
				<p class="text-slate-600">{crawlResult.items[item].data.meta.title}</p>
				<p>Description:</p>
				<p class="text-slate-600">{crawlResult.items[item].data.meta.description}</p>
				<p>Canonical:</p>
				<p class="text-slate-600">{crawlResult.items[item].data.meta.canonical}</p>
				<p>Alternate:</p>
				{#each crawlResult.items[item].data.meta.alternates as item}
					<p class="text-slate-600">{item.hreflang}: {item.href}</p>
				{/each}

				<!-- Body -->
				<p>H1:</p>
				{#each crawlResult.items[item].data.body.headlines.h1 as item}
					<li class="text-slate-600">{item.text}</li>
				{/each}
				<p>H2:</p>
				{#each crawlResult.items[item].data.body.headlines.h2 as item}
					<li class="text-slate-600">{item.text}</li>
				{/each}
				<p>H3:</p>
				{#each crawlResult.items[item].data.body.headlines.h3 as item}
					<li class="text-slate-600">{item.text}</li>
				{/each}
				<p>H4:</p>
				{#each crawlResult.items[item].data.body.headlines.h4 as item}
					<li class="text-slate-600">{item.text}</li>
				{/each}
				<p>H5:</p>
				{#each crawlResult.items[item].data.body.headlines.h5 as item}
					<li class="text-slate-600">{item.text}</li>
				{/each}
				<p>H6:</p>
				{#each crawlResult.items[item].data.body.headlines.h6 as item}
					<li class="text-slate-600">{item.text}</li>
				{/each}

				<p>Images:</p>
				{#each crawlResult.items[item].data.body.images as item}
					<li class="text-slate-600">
						{item.src}
						<p class="text-slate-700">{item.alt}</p>
					</li>
				{/each}

				<!-- Social -->
				<p>OG Title:</p>
				<p class="text-slate-600">{crawlResult.items[item].data.social.title}</p>
				<p>OG Description:</p>
				<p class="text-slate-600">{crawlResult.items[item].data.social.description}</p>
				<p>OG Image:</p>
				<p class="text-slate-600">{crawlResult.items[item].data.social.image}</p>

				<!-- Schema -->
				<p>Schema:</p>
				<pre class="my-2 rounded-md bg-slate-200 p-2">
					<code class="block max-w-full overflow-x-auto whitespace-pre-wrap break-words">
						{crawlResult.items[item].data.schema}
					</code>
				</pre>
			</div>
		{/each}
	{:else if crawlResult && !isSuccess}
		<p>{crawlResult}</p>
	{/if}
</div>
