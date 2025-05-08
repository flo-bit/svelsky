<script>
	import Website from "$lib/Website.svelte";
	import WebsiteWrapper from "$lib/website/WebsiteWrapper.svelte";

	let { data } = $props();
</script>

<WebsiteWrapper {data}>
	<Website />
</WebsiteWrapper>
