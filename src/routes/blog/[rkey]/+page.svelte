<script lang="ts">
	import Blog from '$lib/Blog.svelte';
	import WebsiteWrapper from '$lib/website/WebsiteWrapper.svelte';
	
	let { data } = $props();
</script>

<WebsiteWrapper {data}>
	<Blog />
</WebsiteWrapper>