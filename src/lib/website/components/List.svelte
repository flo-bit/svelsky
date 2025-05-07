<script lang="ts">
	import { getContext, hasContext, type Snippet } from 'svelte';
	import { getData, type ListCollections } from '../data';
	import { listRecords } from '$lib/oauth/atproto';
	import EditingList from './EditingList.svelte';

	let {
		collection,
		item,
		addItem,
		empty
	}: {
		collection: ListCollections;
		item: Snippet<[any, any]>;
		addItem: Snippet<[any]>;
		empty?: Snippet;
	} = $props();

	const data = getData();
	const did = getContext('did') as string;
</script>

{#if hasContext('isEditing')}
	{#await listRecords({ did, collection }) then records}
		<EditingList {records} {collection} {item} {addItem} {empty} />
	{:catch error}
		{error}
	{/await}
{:else if !data[collection] || (data[collection] as unknown[]).length === 0}
	{@render empty?.()}
{:else}
	{#each data[collection] as itemData}
		{@render item(itemData.value, () => {})}
	{/each}
{/if}
