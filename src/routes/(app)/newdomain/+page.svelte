<script>
	let domain = '';

	$: console.log(domain);
</script>

<section>
	<div class="bg-slate-100 px-12">
		<form class="wrap flex gap-6 py-6">
			<div class="w-full">
				<label for="email" class="mb-2 block text-sm font-medium text-gray-900">New Domain</label>
				<input
					type="email"
					id="email"
					bind:value={domain}
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="e.g. tangit.sk"
					required
				/>
			</div>
			<button
				type="submit"
				class="mb-0.5 h-min self-end rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800"
				>Submit
			</button>
		</form>
	</div>
</section>
