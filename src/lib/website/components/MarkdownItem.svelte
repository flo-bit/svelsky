<script lang="ts">
	import { type ElementType, type IndividualCollections } from '../data';
	import SingleRecord from './SingleRecord.svelte';
	import MarkdownText from './MarkdownText.svelte';
	import { type ProseSize } from '@fuxui/base';

	let {
		collection,
		rkey,
		key,
		placeholder,
		defaultContent,
		size
	}: {
		collection: IndividualCollections;
		rkey: ElementType<IndividualCollections>;
		key: string;
		placeholder?: string;
		defaultContent?: string;
		size?: ProseSize;
	} = $props();
</script>

<SingleRecord {collection} {rkey}>
	{#snippet child(data)}
		<MarkdownText {key} {placeholder} {defaultContent} {data} {size} />
	{/snippet}
</SingleRecord>