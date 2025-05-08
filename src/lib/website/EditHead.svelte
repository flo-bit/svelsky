<script lang="ts" module>
	export const settingsModal = $state({
		show: false,
		title: '',
		favicon: '',
		edited: false
	});
</script>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { getUpdateRecordFunctions } from './data';
	import { Head, Heading, Input, Label, Modal } from '@fuxui/base';
	import { PopoverEmojiPicker } from '@fuxui/social';

	let { data } = $props();

	settingsModal.title = data?.value?.title;
	settingsModal.favicon = data?.value?.favicon;

	const updateFunctions = getUpdateRecordFunctions();

	const update = async () => {
		if (!settingsModal.edited) return {};

		settingsModal.edited = false;

		return {
			title: settingsModal.title,
			favicon: settingsModal.favicon
		};
	};

	onMount(() => {
		updateFunctions.push(update);
	});

	onDestroy(() => {
		updateFunctions.splice(updateFunctions.indexOf(update), 1);
	});

	$inspect(settingsModal);
</script>

{#key settingsModal.title + settingsModal.favicon}
	<Head title={settingsModal.title} emojiFavicon={settingsModal.favicon} />
{/key}
