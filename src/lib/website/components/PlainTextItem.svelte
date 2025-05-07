<script lang="ts">
	import { type ElementType, type IndividualCollections } from '../data';
	import SingleRecord from './SingleRecord.svelte';
	import PlainText from './PlainText.svelte';

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
		<PlainText {key} {placeholder} {defaultContent} {data} />
	{/snippet}
</SingleRecord>