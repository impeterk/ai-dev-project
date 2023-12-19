<script>
	import { enhance } from '$app/forms';
	let email;
	let password;
	let organization;
	let activeTab = 'login';
	export let form;

	function switchTab(tab) {
		activeTab = tab;
		if ((form !== undefined) & form.error) {
			form.error = null;
		}
	}
</script>

<div class="flex min-h-screen w-full flex-col justify-center">
	<div class="mt-[20vh]">
		<!-- Headlines -->
		<div class="m-4 text-center">
			{#if activeTab === 'login'}
				<h1 class="text-2xl font-bold">Log-in with existing account</h1>
			{/if}
			{#if activeTab === 'registration'}
				<h1 class="text-2xl font-bold">Register new account</h1>
			{/if}
			{#if activeTab === 'resetPwd'}
				<h1 class="text-2xl font-bold">Reset your password</h1>
			{/if}
		</div>

		<!-- Tabs -->
		<div class="container mx-auto flex max-w-md rounded-lg">
			<button
				class={activeTab === 'login'
					? 'mt-2 inline w-full rounded-t-md border border-transparent bg-secondary px-4 py-2 text-gray-400'
					: 'mt-2 inline w-full rounded-t-md border border-transparent px-4 py-2 text-slate-500 hover:border-secondary'}
				on:click={() => switchTab('login')}
			>
				Login
			</button>
			<button
				class={activeTab === 'registration'
					? 'mt-2 inline w-full rounded-t-md border border-transparent bg-secondary px-4 py-2 text-gray-400'
					: 'mt-2 inline w-full rounded-t-md border border-transparent px-4 py-2 text-slate-500 hover:border-secondary'}
				on:click={() => switchTab('registration')}
			>
				Registration
			</button>
		</div>

		<!-- LOGIN FORM -->
		<form
			method="POST"
			action="?/login"
			use:enhance
			class="container mx-auto flex max-w-md flex-col rounded-b-lg bg-secondary p-6 shadow"
			class:hidden={activeTab !== 'login'}
		>
			<input
				bind:value={email}
				name="email"
				type="text"
				class="mb-2 w-full rounded border p-1 text-lg font-bold placeholder-secondary"
				placeholder="Your e-mail"
				required
			/>

			<input
				bind:value={password}
				name="password"
				type="password"
				class="mb-2 w-full rounded border p-1 text-lg font-bold placeholder-secondary"
				placeholder="Your password"
				required
			/>

			{#if form?.error}
				<p class="text-red-500">Error: {form?.message.slice(1, -1)}</p>

				<p>
					Do you want to <button class="underline" on:click={() => switchTab('resetPwd')}
						>reset password</button
					>?
				</p>
			{/if}
			<button
				class="text-md ml-auto mt-2 w-1/2 rounded-md bg-primary p-2 font-semibold text-slate-100"
			>
				Login
			</button>
		</form>

		<!-- REGISTER FORM -->
		<form
			method="POST"
			action="?/register"
			use:enhance
			class="container mx-auto flex max-w-md flex-col rounded-b-lg bg-secondary p-6 shadow"
			class:hidden={activeTab !== 'registration'}
		>
			<input
				bind:value={email}
				name="email"
				type="email"
				class="mb-2 w-full rounded border p-1 text-lg font-bold placeholder-secondary"
				placeholder="Your e-mail"
				required
			/>

			<input
				bind:value={password}
				name="password"
				type="password"
				class="mb-2 w-full rounded border p-1 text-lg font-bold placeholder-secondary"
				placeholder="Your password"
				required
			/>

			<input
				bind:value={organization}
				name="organization"
				type="text"
				class="mb-2 w-full rounded border p-1 text-lg font-bold placeholder-secondary"
				placeholder="Your organization ID"
				required
			/>

			{#if form?.error}
				<p class="text-red-500">Error: {form?.message.slice(1, -1)}</p>
			{/if}
			{#if form?.success}
				<p class="text-green-500">{form?.message}</p>
			{/if}

			<button
				class="text-md ml-auto mt-2 w-1/2 rounded-md bg-primary p-2 font-semibold text-slate-100"
			>
				Register
			</button>
		</form>

		<!-- RESET PWD FORM -->
		<form
			method="POST"
			action="?/resetPassword"
			use:enhance
			class="container mx-auto flex max-w-md flex-col rounded-b-lg bg-secondary p-6 shadow"
			class:hidden={activeTab !== 'resetPwd'}
		>
			<input
				bind:value={email}
				name="email"
				type="text"
				class="mb-2 w-full rounded border p-1 text-lg font-bold placeholder-secondary"
				placeholder="Your email for resetting the password"
				required
			/>

			{#if form?.error}
				<p class="text-red-500">Error: {form?.message.slice(1, -1)}</p>
			{/if}
			{#if form?.success}
				<p class="text-green-500">{form?.message}</p>
			{/if}

			<button
				class="text-md ml-auto mt-2 w-1/2 rounded-md bg-primary p-2 font-semibold text-slate-100"
			>
				Reset password
			</button>
		</form>
	</div>
</div>
