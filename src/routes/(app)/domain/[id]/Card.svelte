<script>
	export let heading;
	export let borderColor = 'border-white';
</script>

<div
	class="animated mb-5 ml-3 mr-3 mt-5 rounded-xl border-4 bg-white p-5 hover:shadow-lg {borderColor} "
>
	<h3 class="text-xl font-bold">{heading}</h3>
	<ul class="ml-2 mt-2">
		<li class="list-inside list-disc">first thing</li>
		<li class="list-inside list-disc">second thing</li>
		<li class="list-inside list-disc">third thing</li>
	</ul>
</div>
