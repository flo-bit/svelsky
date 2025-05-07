<script lang="ts">
	import { getContext, hasContext, type Snippet } from 'svelte';
	import type { Collection } from './data';
	import { listRecords } from '$lib/oauth/atproto';
	import EditingList from './EditingList.svelte';

	let {
		collection,
		item,
		addItem,
		empty
	}: {
		collection: Collection;
		item: Snippet<[any, any]>;
		addItem: Snippet<[any]>;
		empty?: Snippet;
	} = $props();

	let data = getContext('data') as Record<string, unknown>;
	const did = getContext('did') as string;
</script>

{#if hasContext('isEditing')}
	{#await listRecords({ did, collection }) then records}
		<EditingList {records} {collection} {item} {addItem} {empty} />
	{:catch error}
		{error}
	{/await}
{:else}
	{#each data[collection] as itemData}
		{@render item(itemData.value, () => {})}
	{/each}

	{#if (!data[collection] || (data[collection] as any[]).length === 0) && empty}
		{@render empty()}
	{/if}
{/if}
