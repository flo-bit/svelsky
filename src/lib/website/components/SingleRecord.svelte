<script lang="ts">
	import { getRecord } from '$lib/oauth/atproto';
	import { getContext, type Snippet } from 'svelte';
	import EditSingleRecord from './EditSingleRecord.svelte';
	import { getData, type ElementType, type IndividualCollections } from '../data';

	let {
		collection,
		rkey,
		child
	}: {
		collection: IndividualCollections;
		rkey: ElementType<IndividualCollections>;
		child: Snippet<[any]>;
	} = $props();

	const data = getData();
	const did = getContext('did') as string;
</script>

{#if getContext('isEditing')}
	{#await getRecord({ did, collection, rkey }) then record}
		<EditSingleRecord data={record}>
			{#snippet child(recordData)}
				{@render child(recordData)}
			{/snippet}
		</EditSingleRecord>
	{:catch error}
		<EditSingleRecord
			data={{
				uri: 'at://' + did + '/' + collection + '/' + rkey,
				value: {}
			}}
		>
			{#snippet child(recordData)}
				{@render child(recordData)}
			{/snippet}
		</EditSingleRecord>
	{/await}
{:else}
	{@render child(data?.[collection]?.[rkey]?.value)}
{/if}
