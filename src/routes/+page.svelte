<script>
	import { enhance } from '$app/forms';
	export let form;
	let login;
	let password;

	let success = false;
	//
	// $: {
	// 	if (form && form.success) {
	// 		success = true;
	// 		setTimeout(() => {
	// 			success = false;
	// 		}, 3000);
	// 	}
	// }
	// // $: altString = form?.alteredString;
</script>

<div class="flex min-h-screen w-full flex-col justify-center">
	<div class="mt-[20vh]">
		<div class="m-4 text-center">
			<h1 class="text-3xl font-bold">Login</h1>
		</div>
		<form
			method="POST"
			use:enhance
			class="container mx-auto flex max-w-lg flex-col rounded-lg bg-slate-300/60 p-6 shadow"
		>
			<label class="font-meduim text-sm uppercase"
				>Login
				<input bind:value={login} name="login" type="text" class="mb-2 w-full rounded border p-1" />
			</label>
			<label class="font-meduim text-sm uppercase">
				Password
				<input
					bind:value={password}
					name="password"
					type="password"
					class="mb-2 w-full rounded border p-1"
				/>
			</label>
			<!-- <button -->
			<!-- 	disabled={!login && !password} -->
			<!-- 	class={`${ -->
			<!-- 		login && password ? 'bg-slate-900' : 'bg-slate-900/60' -->
			<!-- 	} mx-auto mt-2 w-1/2 rounded-md p-2 text-lg font-semibold text-slate-100`}>Submit</button> -->
			<button
				class="
					ml-auto mt-2 w-1/2 rounded-md bg-slate-900 p-2 text-lg font-semibold text-slate-100">Login</button
			>
		</form>

		<!-- {#if altString} -->
		<!-- 	<div class="mb-8 flex w-full flex-col rounded-lg bg-slate-500/60 p-6 text-center shadow"> -->
		<!-- 		<p class="font-semiblod text-slate-900">{altString}</p> -->
		<!-- 	</div> -->
		<!-- {/if} -->
	</div>
	<div class="mt-auto flex flex-col items-center justify-center">
		<h1 class="text-3xl font-bold">Welcome to SvelteKit</h1>
		<p>
			Visit <a class="text-blue-600" href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
		</p>
	</div>
</div>
