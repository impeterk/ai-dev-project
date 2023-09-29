<script>
import {
		firstInCollection,
		firstVisible,
		lastInCollection,
		lastVisible,
		currentCollection
	} from '$lib/store';
    // preload is set off it was causing issues
</script>

<div class="flex w-full justify-center gap-12 pt-12">
<!-- visible based entries, so we do not over/under flow the collection -->
	{#if $firstVisible.id !== $firstInCollection.id}
	    <a data-sveltekit-preload-data="off" href="?loadbefore={$firstVisible.id}">Load Previous</a>
	{/if}
	{#if $lastVisible.id !== $lastInCollection.id}
	    <a data-sveltekit-preload-data="off" href="?loadafter={$lastVisible.id}">Load Next</a> 
	{/if}
</div>