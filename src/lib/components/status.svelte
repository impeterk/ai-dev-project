<script>
	import Icon from '@iconify/svelte';

	export let status = 'scanning';
	let icon;
	switch (status) {
		case 'scanning':
			icon = 'mdi:hourglass';
			break;
        case 'finished':
            icon = 'mdi:check-circle-outline'
		default:
			break;
	}
</script>

<p
	class="button flex items-center gap-1"
	class:bg-warning={status == 'added'}
	class:bg-success={status == 'finished'}
	class:bg-error={status == 'aborted'}
	class:bg-secondary={status == 'scanning'}
	class:bg-yellow-300={status == 'evaluating'}
	class:bg-purple-200={status == 'ai magic'}
>
	<Icon {icon} class="text-2xl" />
	{status}
</p>
