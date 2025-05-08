<script lang="ts">
	import Blog from '$lib/Blog.svelte';
	import EditingWebsiteWrapper from '$lib/website/EditingWebsiteWrapper.svelte';
	import { onMount } from 'svelte';
	import { TID } from '@atproto/common-web';

	let { data } = $props();


	let current = $state();

	onMount(() => {
		const rkey = TID.nextStr();

		current = { collection: 'dev.flo-bit.blog.entry', rkey };
	});
</script>

{#if current}
	<EditingWebsiteWrapper data={{ ...data, current }}>
		<Blog />
	</EditingWebsiteWrapper>
{/if}

