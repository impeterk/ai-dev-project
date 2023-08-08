<script>
	export let form;
	let newString;
	let success = false;

	$: {
		if (form && form.success) {
			success = true;
			setTimeout(() => {
				success = false;
			}, 3000);
		}
	}
	$: altString = form?.alteredString;
</script>

<div class="flex h-screen w-full flex-col rounded-lg bg-gray-300 p-6 shadow">
	<div class="mb-8">
		<div class="mb-4 text-center text-lg font-bold">Simple Form</div>
		<div class="mb-4 text-center text-sm">Turns lowercase string into uppercase</div>
		<form action="" method="post" class="flex flex-col">
			<label class="font-meduim text-sm uppercase"
				>String
				<input
					bind:value={newString}
					name="string"
					type="text"
					class="mb-2 w-full rounded border p-1"
				/>
			</label>
			<button
				disabled={!newString}
				class={`${
					newString ? 'bg-slate-900' : 'bg-slate-900/60'
				} mx-auto mt-2 w-1/2 rounded-md p-2 text-lg font-semibold text-slate-100`}>Submit</button
			>
		</form>
	</div>

	{#if altString}
		<div class="mb-8 flex w-full flex-col rounded-lg bg-slate-500/60 p-6 text-center shadow">
			<p class="font-semiblod text-slate-900">{altString}</p>
		</div>
	{/if}

	<div class="mt-auto flex flex-col items-center justify-center">
		<h1 class="text-3xl font-bold">Welcome to SvelteKit</h1>
		<p>
			Visit <a class="text-blue-600" href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
		</p>
	</div>
</div>
