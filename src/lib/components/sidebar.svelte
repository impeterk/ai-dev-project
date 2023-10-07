<script>
	import { page } from '$app/stores';
	import {
		ChartPieSolid,
		BookSolid,
		LifeBuoySolid,
		FilePlusSolid,
		ArrowLeftToBracketOutline
	} from 'flowbite-svelte-icons';
	$: activeUrl = $page.url.pathname;
</script>

<nav class="flex h-full flex-col">
	<h3 class="mb-4 inline-flex items-center text-3xl font-semibold text-gray-500 dark:text-gray-400">
		Dashboard
	</h3>
	<ul class="space-y-2 font-medium">
		<li>
			<a
				href="/"
				class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${activeUrl ==
				'/'
					? 'dark:group:text-white bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
					: ''}"
			>
				<ChartPieSolid
					class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
				/>
				<span class="ml-3">Dashboard</span>
			</a>
		</li>
		<li class="ml-8">
			<a
				href="/newdomain"
				class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${activeUrl ==
				'/newdomain'
					? 'dark:group:text-white bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
					: ''}"
			>
				<FilePlusSolid
					class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
				/>
				<span class="ml-3">Add Domain</span>
			</a>
		</li>
	</ul>
	<ul class="mt-4 space-y-2 border-t border-gray-200 pt-4 font-medium dark:border-gray-700">
		<li>
			<a
				href="/documentation"
				class="group flex items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${activeUrl ==
				'/documentation'
					? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
					: ''}"
			>
				<BookSolid
					class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
				/>
				<span class="ml-3">Documentation</span>
			</a>
		</li>

		<li>
			<a
				href="/help"
				class="group flex items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${activeUrl ==
				'/help'
					? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
					: ''}"
			>
				<LifeBuoySolid
					class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
				/>
				<span class="ml-3">Help</span>
			</a>
		</li>
	</ul>
	<ul class="mt-auto space-y-2 border-t border-gray-200 pt-4 font-medium dark:border-gray-700">
		<li
			class="group flex items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
		>
			<ArrowLeftToBracketOutline class="rotate-180" />
			<span class="ml-3">Log out</span>
		</li>
	</ul>
</nav>
