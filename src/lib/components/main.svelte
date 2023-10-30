<h1 class="mt-20 px-40 text-5xl font-black text-primary">
	<slot name="title" />
</h1>
<main class="shink-0 mx-20 mt-20 max-w-7xl xl:mx-auto">
	<slot name="header" />
	<section class="rounded-xl bg-secondary p-12">
		<slot />
	</section>
</main>
