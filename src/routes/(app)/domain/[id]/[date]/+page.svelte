<script>
	import { Collection } from 'sveltefire';
 import {page} from '$app/stores'

 const {id, date} = $page.params

</script>

<section class="text-white">
<Collection ref={`domain/${id}/dateofscan/${date}/scannedurls`} let:data>
    {#each data as url}
        <p>{url.id} </p>
        <pre>{url.meta.title}</pre>
    {/each}
   </Collection>
</section>
