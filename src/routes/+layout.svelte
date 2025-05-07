<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';
	import { initClient } from '$lib/oauth';

	let { children } = $props();

	onMount(() => {
		initClient();
	});
</script>

{@render children()}
