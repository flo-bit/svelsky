<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { getUpdateRecordFunctions } from './data';

	let { data, children, class: className } = $props();

	let accent = $state(data?.value?.accent);
	let base = $state(data?.value?.base);

	let edited = $state(false);

	const updateFunctions = getUpdateRecordFunctions();

	const update = async () => {
		if (!edited) return {};

		edited = false;

		return {
			accent,
			base
		};
	};

	const themeChanged = (event: Event) => {
		let newAccent = (event as CustomEvent).detail?.accentColor;
		if (newAccent) {
			// remove from body
			document.body.classList.remove('theme', accent);

			accent = newAccent;

			// add to body
			document.body.classList.add('theme', accent);

			edited = true;
		}

		let newBase = (event as CustomEvent).detail?.baseColor;
		if (newBase) {
			// remove from body
			document.body.classList.remove('theme', base);

			base = newBase;

			// add to body
			document.body.classList.add('theme', base);

			edited = true;
		}
	};

	onMount(() => {
		window.addEventListener('theme-changed', themeChanged);
		updateFunctions.push(update);

		// add theme to body
		document.body.classList.add('theme', accent, base);
	});

	onDestroy(() => {
		window.removeEventListener('theme-changed', themeChanged);

		updateFunctions.splice(updateFunctions.indexOf(update), 1);
	});
</script>

<div
	class={[
		'theme',
		accent,
		base,
		'bg-base-50 dark:bg-base-950 min-h-[100dvh] overflow-y-auto py-16',
		className
	]}
>
	{@render children?.()}
</div>
