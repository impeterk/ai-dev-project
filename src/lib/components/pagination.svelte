<script>
	import {
		firstInCollection,
		firstVisible,
		lastInCollection,
		lastVisible,
		currentPage,
		collectionPath,
		orderField,
		orderDirection
	} from '$lib/store';
	import { nextLoad, previosLoad } from '$lib/utils/dataLoad.js';
	import { AngleRightSolid, AngleLeftSolid } from 'flowbite-svelte-icons';
	import { spring } from 'svelte/motion';

	const pageIndicator = spring();

	$: pageIndicator.set($currentPage);

	$: offset = modulo($pageIndicator, 1);

	/**
	 * @param {number} n
	 * @param {number} m
	 */
	function modulo(n, m) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
	// preload is set off it was causing issues
</script>

<div class="grid w-full grid-cols-3 justify-items-center pt-12">
	<div
		class="relative col-span-1 col-start-2 box-border flex h-12 items-center justify-center gap-5 text-primary"
	>
		<!-- visible based entries, so we do not over/under flow the collection -->
		{#if $firstVisible.id !== $firstInCollection.id}
			<!-- <a
				data-sveltekit-preload-data="off"
				href="?loadbefore={$firstVisible.id}"
				class="flex h-12 items-center gap-4"
			>
				<AngleLeftSolid size="sm" />
				<div class="h-3 w-3 rounded-full outline outline-offset-1 outline-primary" />
			</a> -->
			<button
				data-sveltekit-preload-data="off"
				on:click={previosLoad($collectionPath, $orderField, $orderDirection, $firstVisible)}
				class="flex h-12 items-center gap-4"
			>
				<AngleLeftSolid size="sm" />
				<div class="h-3 w-3 rounded-full outline outline-offset-1 outline-primary" />
			</button>
		{/if}
		<div class="relative h-8 w-8 overflow-hidden text-center">
			<div class="absolute h-full w-full" style="transform: translate(-{100 * offset}%, 0 )">
				<strong
					class="select-nonne absolute -right-full flex h-full w-full items-center justify-center rounded-full bg-primary text-2xl font-normal text-secondary"
					aria-hidden="true">{Math.floor($pageIndicator + 1)}</strong
				>
				<strong
					class="absolute flex h-full w-full items-center justify-center rounded-full bg-primary text-2xl font-normal text-secondary"
					>{Math.floor($pageIndicator)}</strong
				>
			</div>
		</div>
		{#if $lastVisible.id !== $lastInCollection.id}
			<button
				data-sveltekit-preload-data="off"
				on:click={nextLoad($collectionPath, $orderField, $orderDirection, $lastVisible)}
				class="flex h-12 items-center gap-4"
			>
				<div class="h-3 w-3 rounded-full outline outline-offset-1 outline-primary" />
				<AngleRightSolid size="sm" />
			</button>
		{/if}
	</div>
</div>
