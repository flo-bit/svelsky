<script lang="ts">
	import { getContext, type Snippet } from 'svelte';
	import SingleRecord from './SingleRecord.svelte';
	import { TID } from '@atproto/common-web';
	import type { Record } from '@atproto/api/dist/client/types/com/atproto/lexicon/schema';
	import { deleteRecord } from '$lib/oauth/atproto';
	import { parseUri } from './data';

	let {
		records,
		collection,
		item,
		addItem,
		empty
	}: {
		records: Record[];
		collection: string;
		item: Snippet<[any, any]>;
		addItem: Snippet<[any]>;
		empty?: Snippet;
	} = $props();

	let allRecords = $state(records);

	const did = getContext('did') as string;

	$inspect(allRecords);
</script>

{#if allRecords.length === 0 && empty}
	{@render empty()}
{:else}
	{#each allRecords as itemData (itemData.uri)}
		<SingleRecord data={itemData}>
			{#snippet child(data)}
				{@render item(data, async () => {
					const { rkey } = parseUri(itemData.uri as string);
					await deleteRecord({ did, collection, rkey });

					allRecords = allRecords.filter((record) => record.uri !== itemData.uri);
				})}
			{/snippet}
		</SingleRecord>
	{/each}
{/if}

{@render addItem?.(() => {
	console.log('clicked');
	const rkey = TID.nextStr();

	allRecords.push({
		uri: 'at://' + did + '/' + collection + '/' + rkey,
		value: {}
	});
})}
