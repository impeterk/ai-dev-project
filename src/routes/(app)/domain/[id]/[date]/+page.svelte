<script>
	import Main from '$lib/components/main.svelte';
	// set main title(h1) on the page

	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import Spinner from '$lib/components/spinner.svelte';
	import { currentCollection, breadcrumbs } from '$lib/store';
	import { onDestroy, beforeUpdate } from 'svelte';
	import { TableSearch } from 'flowbite-svelte';
	import { dateFormatter, timeFormatter } from '$lib/utils/dateFormatter';
	import { fade, fly } from 'svelte/transition';

	const { id, date } = $page.params;
	let expanded = null;

	$: results = $currentCollection;
	$: activeTab = 'body';
	// breadcrumbs
	// TODO: rework to generate from server
	$: beforeUpdate(async () => {
		await $breadcrumbs.set(date, {
			id: `${dateFormatter(Number(date))} ${timeFormatter(Number(date))}`,
			link: $page.url.pathname
		});
	});
	$: onDestroy(async () => {
		await $breadcrumbs.delete(date);
	});

	$: handleExpandUrl = (index) => {
		activeTab = 'body';
		expanded = expanded === index ? null : index;
	};
</script>

<Main>
	<svelte:fragment slot="title">URL Results</svelte:fragment>
	<section class="">
		<header
			class="grid grid-cols-3 items-center rounded-xl bg-gradient-to-r from-primary to-accent px-4 text-slate-100"
		>
			<h3 class="text-2xl font-semibold">
				<span>{dateFormatter(date)} : {timeFormatter(date)}</span>
			</h3>
			<div class="flex w-1/2 items-center justify-between justify-self-center">
				<h3>Impediments</h3>
				<h3>15</h3>
			</div>
			<div class="relative flex w-full items-center justify-end">
				<TableSearch
					searchClass="relative"
					inputClass="bg-secondary text-primary p-1 pr-2 rounded-lg text-right"
					placeholder="Search for items"
				/>
			</div>
		</header>
		<ol class="min-h-[650px] space-y-4 pt-12">
			{#if $results.length === 0}
				<Spinner />
			{/if}
			{#each $results as url, index}
				<li class="grid grid-cols-3 rounded-lg bg-white p-4 text-xl text-primary shadow-lg">
					<p class="col-span-2 col-start-1 break-words pr-2">
						{url.url?.replace('https://', '') || url.url}
					</p>
					<div class="col-span-1 flex flex-wrap content-center gap-4">
						<button class="" on:click={handleExpandUrl(index)}>
							<div class="flex items-center gap-2 overflow-hidden">
								See more
								<Icon
									icon={expanded === index ? 'mdi:chevron-up' : 'mdi:chevron-down'}
									width="32px"
									height="32px"
								/>
							</div>
						</button>
						<button class="h-fit rounded-xl bg-primary px-3 py-1 text-secondary"> Inspect </button>
					</div>
				</li>
				{#if expanded === index}
					<div class="w-full" transition:fade={{ duration: 300 }}>
						<header
							class=" mx-4 flex w-full px-2 text-2xl font-bold text-white transition-all duration-200 ease-linear"
						>
							<button
								class="-mx-1 rounded-t-lg bg-body px-6 py-2 shadow-lg transition-all duration-200 ease-linear hover:z-50"
								on:click={() => (activeTab = 'body')}
								class:z-50={activeTab == 'body'}
								class:underline={activeTab == 'body'}
								class:px-8={activeTab == 'body'}>Body</button
							>

							<button
								class="-mx-1 rounded-t-lg bg-meta px-6 py-2 shadow-lg transition-all duration-200 ease-linear hover:z-50"
								on:click={() => (activeTab = 'meta')}
								class:z-50={activeTab == 'meta'}
								class:underline={activeTab == 'meta'}
								class:px-8={activeTab == 'meta'}>Meta</button
							>
							<button
								class="-mx-1 rounded-t-lg bg-social px-6 py-2 shadow-lg transition-all duration-200 ease-linear hover:z-50"
								on:click={() => (activeTab = 'social')}
								class:z-50={activeTab == 'social'}
								class:underline={activeTab == 'social'}
								class:px-8={activeTab == 'social'}>Social</button
							>
							<button
								class="-mx-1 rounded-t-lg bg-schema px-6 py-2 shadow-lg transition-all duration-200 ease-linear hover:z-50"
								on:click={() => (activeTab = 'schema')}
								class:z-50={activeTab == 'schema'}
								class:underline={activeTab == 'schema'}
								class:px-8={activeTab == 'schema'}>Schema</button
							>
						</header>

						<!-- body related -->
						{#if activeTab === 'body'}
							<!-- headlines -->
							<div
								class="h-[50vh] overflow-x-clip overflow-y-scroll rounded-xl bg-white px-2 py-4 shadow-lg scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-primary"
							>
								<header class="mx-4 grid grid-cols-3 gap-4 border-b pt-4 text-xl font-bold">
									<p>Headlines</p>
									<p>Evaluation</p>
									<p>AI Magic</p>
								</header>
								<div class="mx-4 grid grid-cols-3 gap-4">
									<ul class="col-span-1 col-start-1 my-4 rounded-xl bg-secondary p-4">
										{#each Object.entries(url.body.headlines) as [key, value]}
											<header class="text-xl font-semibold uppercase">{key}</header>
											<ol class="space-y-2">
												{#each value as value, index}
													<li class="pl-2">
														<span class="font-medium">
															{index + 1}.
														</span>
														{value.text}
													</li>
												{:else}
													<li class="pl-2">empty</li>
												{/each}
											</ol>
										{/each}
									</ul>
									<ul class="col-span-1 col-start-2 my-4 rounded-xl bg-[#FAD4EF] p-4">
										{#each Object.entries(url.issues.body.headlines) as [key, value]}
											<header class="text-xl font-semibold uppercase">{key}</header>
											<ol class="space-y-2">
												{#if value == 'missing' || !value}
													<li class="rounded-xl bg-error pl-2 font-medium text-secondary">
														Missing
													</li>
												{:else}
													<li class="pl-2">{value}</li>
												{/if}
											</ol>
										{/each}
									</ul>
									<ul class="col-span-1 col-start-3 my-4 rounded-xl bg-[#E0F4FF] p-4" />
								</div>
								<!-- images -->

								<header class="mx-4 grid grid-cols-3 gap-4 border-b pt-4 text-xl font-bold">
									<p>Images</p>
									<p>Evaluation</p>
									<p>AI Magic</p>
								</header>
								<div class="mx-4 grid grid-cols-3 gap-4">
									<ul class="col-span-1 col-start-1 my-4 rounded-xl bg-secondary p-4">
										{#each url.body.images as image, index (index)}
											<ol class="space-y-2">
												{#if !image}
													<li class="pl-2">No Images</li>
												{:else}
													<li
														class="flex shrink-0 content-center items-center gap-2 break-words pl-2"
													>
														<span class="font-medium">
															{index + 1}.
														</span>
														<a
															href={image.src}
															target="_blank"
															class="text-link underline underline-offset-2 hover:text-primary"
															>image src</a
														>
														{#if image.alt}
															<span>alt text: {image.alt}</span>
														{/if}
													</li>
												{/if}
											</ol>
										{/each}
									</ul>
									<ul class="col-span-1 col-start-2 my-4 rounded-xl bg-[#FAD4EF] p-4">
										{#each url.issues.body.images as image, index (index)}
											<ol class="space-y-2">
												<li
													class="flex shrink-0 content-center items-center gap-2 break-words pl-2"
												>
													<span class="font-medium">
														{index + 1}.
													</span>
													<span>alt text: {image.alt}</span>
												</li>
											</ol>
										{/each}
									</ul>
									<ul class="col-span-1 col-start-3 my-4 rounded-xl bg-[#E0F4FF] p-4" />
								</div>
							</div>
						{/if}

						<!-- meta -->
						{#if activeTab === 'meta'}
							<div class="rounded-xl bg-white px-2 py-4 shadow-lg">
								<header class="mx-4 grid grid-cols-3 gap-4 border-b pt-4 text-xl font-bold">
									<p>Meta</p>
									<p>Evaluation</p>
									<p>AI Magic</p>
								</header>
								<div class="mx-4 grid grid-cols-3 gap-4">
									<ul class="col-span-1 col-start-1 my-4 rounded-xl bg-secondary p-4">
										{#each Object.entries(url.meta) as [key, value]}
											<div class="w-full space-y-2">
												<header class="text-xl font-semibold uppercase">{key}</header>
												{#if value.length === 0}
													<span class="pl-2">empty</span>
												{:else if key === 'alternates'}
													<ul>
														{#each value as value, index}
															<li class="pl-2">
																<span class="font-medium">
																	{index + 1}.
																</span>
																<span class="break-words">{value.href}</span> |
																<span>{value.hreflang}</span>
															</li>
														{/each}
													</ul>
												{:else}
													<span class="pl-2">value</span>
												{/if}
											</div>
										{/each}
									</ul>
									<ul class="col-span-1 col-start-2 my-4 rounded-xl bg-[#FAD4EF] p-4">
										{#each Object.entries(url.issues.meta) as [key, value]}
											<header class="text-xl font-semibold uppercase">{key}</header>
											<ol class="space-y-2">
												<li class="pl-2">{value}</li>
												{#if !value}
													<li class="rounded-xl bg-error pl-2 font-medium text-secondary">
														Missing
													</li>
												{/if}
											</ol>
										{/each}
									</ul>
									<ul class="col-span-1 col-start-3 my-4 rounded-xl bg-[#E0F4FF] p-4" />
								</div>
							</div>
						{/if}

						<!-- social -->
						{#if activeTab === 'social'}
							<div class="rounded-xl bg-white px-2 py-4 shadow-lg">
								<header class="mx-4 grid grid-cols-3 gap-4 border-b pt-4 text-xl font-bold">
									<p>Social</p>
									<p>Evaluation</p>
									<p>AI Magic</p>
								</header>
								<div class="mx-4 grid grid-cols-3 gap-4">
									<div class="col-span-1 col-start-1 my-4 break-words rounded-xl bg-secondary p-4">
										<h4 class="text-xl font-semibold uppercase">Description</h4>
										<p>{url.social.descrition || 'empty'}</p>
										<h4 class="text-xl font-semibold uppercase">Image</h4>
										{#if !url.social.image}
											<p>{'empty'}</p>
										{:else}
											<a
												href={url.social.image}
												target="_blank"
												rel="noopener noreferrer"
												class="text-link underline underline-offset-2 hover:text-primary"
												>Open Image</a
											>
										{/if}
										<h4 class="text-xl font-semibold uppercase">title</h4>
										<p>{url.social.title || 'empty'}</p>
									</div>
									<div class="col-span-1 col-start-2 my-4 rounded-xl bg-[#FAD4EF] p-4">
										<h4 class="text-xl font-semibold uppercase">Description</h4>
										<p>{url.issues.social.descrition || 'empty'}</p>
										<h4 class="text-xl font-semibold uppercase">Image</h4>
										<p>{url.issues.social.image}</p>

										<h4 class="text-xl font-semibold uppercase">title</h4>
										<p>{url.issues.social.title}</p>
									</div>
									<ul class="col-span-1 col-start-3 my-4 rounded-xl bg-[#E0F4FF] p-4" />
								</div>
							</div>
						{/if}

						<!-- schema -->
						{#if activeTab === 'schema'}
							<div class="rounded-xl bg-white px-2 py-4 shadow-lg">
								<header class="mx-4 grid grid-cols-3 gap-4 border-b pt-4 text-xl font-bold">
									<p>Schema</p>
									<p>Evaluation</p>
									<p>AI Magic</p>
								</header>
								<div class="mx-4 grid grid-cols-3 gap-4">
									<div class="col-span-1 col-start-1 my-4 break-words rounded-xl bg-secondary p-4">
										<p>{url.schema}</p>
									</div>
									<div class="col-span-1 col-start-2 my-4 rounded-xl bg-[#FAD4EF] p-4">
										<p>{url.issues.schema}</p>
									</div>
									<ul class="col-span-1 col-start-3 my-4 rounded-xl bg-[#E0F4FF] p-4" />
								</div>
							</div>
						{/if}
					</div>
				{/if}
			{/each}
		</ol>
		<Pagination />
	</section>
</Main>
