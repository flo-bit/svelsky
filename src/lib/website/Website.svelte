<script>
	import { Input } from '@fuxui/base';
	import List from './List.svelte';
	import MarkdownText from './MarkdownText.svelte';
	import SingleRecord from './SingleRecord.svelte';
	import Test from './Test.svelte';
	import PlainText from './PlainText.svelte';
	import { setContext } from 'svelte';
	import Link from './Link.svelte';
	import PlainTextItem from './PlainTextItem.svelte';

	let { data } = $props();

	setContext('data', data);
</script>

<div class="mx-auto max-w-2xl py-16">
	<!-- <MarkdownText collection="dev.flo-bit.about" key="about" {data} /> -->

	<!-- <MarkdownText collection="link.flo-bit.dev" rkey="test" key="content" {data} /> -->
	<!-- 
	<MarkdownText
		collection="dev.flo-bit.test"
		rkey="self"
		key="test"
		{data}
		placeholder="Write something about yourself..."
		defaultContent="Hello there"
	/> -->

	<PlainTextItem collection="dev.flo-bit.about" rkey="test" key="about" {data} placeholder="Write something about yourself..." />

	<div class="relative flex flex-col gap-4">
		<List collection="link.flo-bit.dev">
			{#snippet item(data, deleteItem)}
				<Link {data} {deleteItem} />
			{/snippet}

			{#snippet addItem(add)}
				<button class="absolute right-0 bottom-0" onclick={add}>Add</button>
			{/snippet}
		</List>
	</div>
	<!--
	<div class="relative flex flex-col gap-4 mt-8">
		<List collection="link.flo-bit.test">
			{#snippet item(data, deleteItem)}
				<Link {data} {deleteItem} />
			{/snippet}

			{#snippet addItem(add)}
				<button class="absolute right-0 bottom-0" onclick={add}>Add</button>
			{/snippet}

			{#snippet empty()}
				<div>Empty list</div>
			{/snippet}
		</List>
	</div> -->
</div>
