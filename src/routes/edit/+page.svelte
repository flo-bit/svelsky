<script lang="ts">
	import Website from '$lib/Website.svelte';
	import EditingWebsiteWrapper from '$lib/website/EditingWebsiteWrapper.svelte';

	let { data } = $props();
</script>

<EditingWebsiteWrapper {data}>
	<Website />
</EditingWebsiteWrapper>
