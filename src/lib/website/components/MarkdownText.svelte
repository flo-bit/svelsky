<script lang="ts">
	import { Prose, type ProseSize } from '@fuxui/base';
	import { marked } from 'marked';
	import { getContext } from 'svelte';

	let {
		key,
		data,
		placeholder,
		defaultContent,
		size = 'md',
		class: className
	}: {
		key: string;
		data: Record<string, any>;
		placeholder?: string;
		defaultContent?: string;
		class?: string;
		size?: ProseSize;
	} = $props();
</script>

{#if getContext('isEditing')}
	{#await import('./MarkdownTextEditor.svelte') then { default: MarkdownTextEditor }}
		<MarkdownTextEditor class={className} {key} data={data.value} {placeholder} {defaultContent} {size} />
	{/await}
{:else}
	<Prose class={className} size={size}>
		{@html marked.parse(data?.value?.[key] ?? defaultContent ?? ('' as string))}
	</Prose>
{/if}
