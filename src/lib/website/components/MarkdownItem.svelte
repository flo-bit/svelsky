<script lang="ts">
	import { type ElementType, type IndividualCollections } from '../data';
	import SingleRecord from './SingleRecord.svelte';
	import MarkdownText from './MarkdownText.svelte';

	let {
		collection,
		rkey,
		key,
		placeholder,
		defaultContent
	}: {
		collection: IndividualCollections;
		rkey: ElementType<IndividualCollections>;
		key: string;
		placeholder?: string;
		defaultContent?: string;
	} = $props();
</script>


<SingleRecord {collection} {rkey}>
	{#snippet child(data)}
		<MarkdownText {key} {placeholder} {defaultContent} {data} />
	{/snippet}
</SingleRecord>