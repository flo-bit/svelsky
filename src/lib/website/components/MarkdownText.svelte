<script lang="ts">
	import { Prose } from '@fuxui/base';
	import { marked } from 'marked';
	import { getContext } from 'svelte';

	let {
		key,
		data,
		placeholder,
		defaultContent,
		class: className
	}: {
		key: string;
		data: Record<string, any>;
		placeholder?: string;
		defaultContent?: string;
		class?: string;
	} = $props();
</script>

{#if getContext('isEditing')}
	{#await import('./MarkdownTextEditor.svelte') then { default: MarkdownTextEditor }}
		<MarkdownTextEditor class={className} {key} {data} {placeholder} {defaultContent} />
	{/await}
{:else}
	<Prose class={className}>
		{@html marked.parse(data[key] ?? defaultContent ?? ('' as string))}
	</Prose>
{/if}
