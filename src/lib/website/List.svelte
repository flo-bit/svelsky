<script lang="ts">
	import { getContext, hasContext, type Snippet } from 'svelte';
	import type { Collection } from './data';
	import { listRecords } from '$lib/oauth/atproto';

	let {
		collection,
		data,
		item
	}: {
		collection: Collection;
		data: Record<string, unknown>;
		item: Snippet<[any]>;
	} = $props();

	const did = getContext('did') as string;
</script>

{#if hasContext('isEditing')}
	{#await listRecords({ did, collection }) then records}
		{#each records as itemData}
			{@render item(itemData)}
		{/each}
	{:catch error}
		{error}
	{/await}
{:else}
{#each data[collection] as itemData}
	{@render item(itemData)}
{/each}

{/if}