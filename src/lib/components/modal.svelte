<script>
    import Icon from "@iconify/svelte"
	export let showDialog; // boolean

	let dialog; // HTMLDialogElement

	$: if (dialog && showDialog) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showDialog = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<div class="flex items-center justify-between">
			<slot name="header" /><button on:click={() => dialog.close()}><Icon icon="akar-icons:cross"/></button>
		</div>
		<hr />
		<slot />
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
        <footer class="flex items-center gap-5 mt-5 justify-end">

            <button on:click={() => dialog.close()}>Cancel</button>
            <slot name="button"/>
        </footer>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.75em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
