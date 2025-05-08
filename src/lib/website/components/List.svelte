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
{:else if !data[collection] || Object.keys(data[collection]).length === 0}
	{@render empty?.()}
{:else}
	{#each Object.values(data[collection]) as itemData}
		{@render item(itemData, () => {})}
	{/each}
{/if}
