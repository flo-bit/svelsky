<script>
	import Website from "$lib/Website.svelte";
	import { setContext } from "svelte";

	let { data } = $props();

	setContext('did', data.did);
	setContext('data', data.data);
</script>

<Website />
