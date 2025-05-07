<script lang="ts">
	import { Prose } from '@fuxui/base';
	import { marked } from 'marked';
	import { hasContext } from 'svelte';
	import type { Collection } from './data';
	import { data as recordData } from './data';

	type ArrayCollections = {
		[K in Collection]: (typeof recordData)[K] extends readonly any[] ? K : never;
	}[Collection];

	type ElementType<C extends Collection> = (typeof recordData)[C] extends readonly (infer U)[]
		? U
		: any;

	type Props =
		| {
				collection: ArrayCollections;
				rkey?: ElementType<ArrayCollections>;
				data: Record<string, any>;
				key: string;
				placeholder?: string;
				defaultContent?: string;
		  }
		| {
				collection: Exclude<Collection, ArrayCollections>;
				rkey: ElementType<Exclude<Collection, ArrayCollections>>;
				data: Record<string, any>;
				key: string;
				placeholder?: string;
				defaultContent?: string;
		  };

	let {
		collection,
		rkey = 'self',
		data,
		key = 'content',
		placeholder,
		defaultContent
	}: Props = $props();
</script>

{#if hasContext('isEditing')}
	{#await import('./MarkdownTextEditor.svelte') then { default: MarkdownTextEditor }}
		<MarkdownTextEditor {collection} {rkey} {key} {placeholder} {defaultContent} />
	{/await}
{:else}
	<Prose>
		{@html marked.parse(data[collection]?.[rkey]?.value?.[key] ?? defaultContent ?? ('' as string))}
	</Prose>
{/if}
