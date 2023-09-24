<script>
	import { enhance } from '$app/forms';
	export let form;
	let success = false;

	$: {
		if (form && form?.success) {
			setTimeout(() => {
				success = false;
			}, 3000);
		} else {
			console.error('Failed to submit form');
		}
	}

	$: newDomainId = form?.newDomainId;
</script>

<section>
	<div class="bg-slate-100 px-12">
		<form class="flex gap-6 py-6" method="POST" action="?/registernewdomain" use:enhance>
			<div class="w-full">
				<label for="email" class="mb-2 block text-sm font-medium text-gray-900"
					>New Domain - add domain 'www.domain...' format</label
				>
				<input
					name="newDomain"
					type="string"
					id="newDomain"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="e.g. www.tangit.sk"
					required
				/>
			</div>
			<button
				type="submit"
				class="mb-0.5 h-min shrink-0 self-end rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-slate-800"
				>Add new Domain
			</button>
		</form>
		{#if form?.status}
			<p
				class="text-4xl"
				class:text-green-500={form?.status === 'success'}
				class:text-red-500={form?.status === 'error'}
			>
				{form?.message}
				{newDomainId}
			</p>
		{/if}
	</div>
</section>
