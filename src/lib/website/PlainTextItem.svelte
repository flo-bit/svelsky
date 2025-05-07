<script lang="ts">
	import { getRecord } from '$lib/oauth/atproto';
	import { getContext } from 'svelte';
	import SingleRecord from './SingleRecord.svelte';

	let {
		collection,
		rkey,
		key,
		data,
		placeholder,
		defaultContent
	}: {
		collection: string;
		rkey: string;
		key: string;
		data: Record<string, any>;
		placeholder?: string;
		defaultContent?: string;
	} = $props();

	let did = getContext('did') as string;
</script>

{#if getContext('isEditing')}
	{#await getRecord({ did, collection, rkey }) then record}
		<SingleRecord data={record}>
			{#snippet child(recordData)}
				{#await import('./PlainTextEditor.svelte') then { default: PlainTextEditor }}
					<PlainTextEditor {key} data={recordData} {placeholder} {defaultContent} />
				{/await}
			{/snippet}
		</SingleRecord>
	{:catch error}
		<SingleRecord data={{
			uri: 'at://' + did + '/' + collection + '/' + rkey,
			value: {}
		}}>
			{#snippet child(recordData)}
				{#await import('./PlainTextEditor.svelte') then { default: PlainTextEditor }}
					<PlainTextEditor {key} data={recordData} {placeholder} {defaultContent} />
				{/await}
			{/snippet}
		</SingleRecord>
	{/await}
{:else}
	<div>{data?.[collection]?.[rkey]?.value?.[key] || defaultContent || placeholder}</div>
{/if}
