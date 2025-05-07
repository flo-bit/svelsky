<script lang="ts">
	import { getContext } from 'svelte';

	let {
		key,
		data,
		placeholder,
		defaultContent
	}: {
		key: string;
		data: Record<string, any>;
		placeholder?: string;
		defaultContent?: string;
	} = $props();
</script>

{#if getContext('isEditing')}
	{#await import('./PlainTextEditor.svelte') then { default: PlainTextEditor }}
		<PlainTextEditor {key} {data} {placeholder} {defaultContent} />
	{/await}
{:else}
	<div>{data[key] || defaultContent || placeholder}</div>
{/if}
