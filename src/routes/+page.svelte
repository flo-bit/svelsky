<script>
	import Website from "$lib/website/Website.svelte";
	import { setContext } from "svelte";

	setContext('did', 'did:plc:257wekqxg4hyapkq6k47igmp');

	let { data } = $props();
</script>

<Website {data} />
