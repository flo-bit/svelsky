<script lang="ts">
	import { base } from '$app/paths';
	import { hasContext } from 'svelte';
	import { getBlob } from './oauth/atproto';

	let { data, did }: { data: any; did: string } = $props();

	$inspect(data);
</script>

{#if hasContext('isEditing')}
	{#await getBlob({ did, cid: data.value.avatar.ref.$link }) then blob}
		<img class="mb-8 size-24 rounded-full" src={blob} alt="" />
	{:catch error}
		{error}
	{/await}
{:else}
	<img
		class="mb-8 size-24 rounded-full"
		src={base + '/image/' + data.value.avatar.ref.$link}
		alt=""
	/>
{/if}