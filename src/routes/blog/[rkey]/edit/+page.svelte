<script lang="ts">
	import Blog from '$lib/Blog.svelte';
	import EditingWebsiteWrapper from '$lib/website/EditingWebsiteWrapper.svelte';

	let { data } = $props();
</script>

<EditingWebsiteWrapper {data}>
	<Blog />
</EditingWebsiteWrapper>
