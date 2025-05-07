<script lang="ts">
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
	{#await import('./PlainTextEditor.svelte') then { default: PlainTextEditor }}
		<PlainTextEditor class={className} {key} {data} {placeholder} {defaultContent} />
	{/await}
{:else}
	<div class={className}>{data[key] || defaultContent || placeholder}</div>
{/if}
