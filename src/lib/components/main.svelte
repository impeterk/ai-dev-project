<h1 class="mt-20 px-40 text-5xl font-black text-primary">
	<slot name="title" />
</h1>
<main class="m-12">
	<slot name="header" />
	<section class="rounded-xl bg-secondary p-12">
		<slot />
	</section>
</main>
