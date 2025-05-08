<script lang="ts">
	import { getContext, type Snippet } from 'svelte';
	import SingleRecord from './EditSingleRecord.svelte';
	import { TID } from '@atproto/common-web';
	import type { Record as ListRecord } from '@atproto/api/dist/client/types/com/atproto/repo/listRecords';
	import { deleteRecord } from '$lib/oauth/atproto';
	import { parseUri } from '../data';

	let {
		records,
		collection,
		item,
		addItem,
		empty
	}: {
		records: Record<string, ListRecord>;
		collection: string;
		item: Snippet<[any, any]>;
		addItem: Snippet<[any]>;
		empty?: Snippet;
	} = $props();

	let allRecords = $state(records);

	const did = getContext('did') as string;
	$inspect(allRecords);
</script>

{#if Object.keys(allRecords).length === 0 && empty}
	{@render empty()}
{:else}
	{#each Object.values(allRecords) as itemData}
		<SingleRecord data={itemData}>
			{#snippet child(data)}
				{@render item(data, async () => {
					if (!itemData.cid) {
						const { rkey } = parseUri(itemData.uri as string);
						delete allRecords[rkey];
						return;
					}
					const { rkey } = parseUri(itemData.uri as string);
					await deleteRecord({ did, collection, rkey });

					delete allRecords[rkey];
				})}
			{/snippet}
		</SingleRecord>
	{/each}
{/if}

{@render addItem?.(() => {
	const rkey = TID.nextStr();

	allRecords[rkey] = {
		cid: '',
		uri: 'at://' + did + '/' + collection + '/' + rkey,
		value: {}
	};
})}
