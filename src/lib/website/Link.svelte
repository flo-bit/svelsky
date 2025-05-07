<script lang="ts">
	import { hasContext } from 'svelte';
	import PlainText from './PlainText.svelte';

	let { data, deleteItem } = $props();
</script>

<div class="relative mt-4 flex flex-col gap-2">
	<div class="pointer-events-none z-10 font-bold">
		<PlainText key="label" {data} placeholder="Write a label..." />
	</div>
	<div class="pointer-events-none z-10">
		<PlainText key="description" {data} placeholder="Write a description..." />
	</div>

	{#if hasContext('isEditing')}
		<button class="absolute top-0 right-0 z-10" onclick={deleteItem}>Delete</button>
	{:else}
		<a href={data.url} target="_blank" class="hover:bg-base-200/50 absolute -inset-2 rounded-2xl"
		></a>
	{/if}
</div>
