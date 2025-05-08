<script lang="ts">
	import { hasContext, type Snippet } from 'svelte';
	import SingleRecord from './components/SingleRecord.svelte';
	import Theme from './Theme.svelte';
	import EditTheme from './EditTheme.svelte';

	let {
		children,
		class: className,
	}: {
		children: Snippet;
		class?: string;
	} = $props();
</script>

<SingleRecord collection="dev.flo-bit.theme" rkey="self">
	{#snippet child(data)}
		{#if hasContext('isEditing')}
			<EditTheme data={data} class={className}>
				{@render children?.()}
			</EditTheme>
		{:else}
			<Theme data={data} class={className}>
				{@render children?.()}
			</Theme>
		{/if}
	{/snippet}
</SingleRecord>
