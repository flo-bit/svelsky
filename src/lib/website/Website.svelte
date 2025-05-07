<script>
	import { Input } from '@fuxui/base';
	import List from './List.svelte';
	import MarkdownText from './MarkdownText.svelte';
	import SingleRecord from './SingleRecord.svelte';
	import Test from './Test.svelte';

	let { data } = $props();

	console.log(data);
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

	<div class="flex flex-col gap-4">
		<List collection="link.flo-bit.dev" {data}>
			{#snippet item(item)}
				<SingleRecord data={item}>
					{#snippet editing(data)}
						<div class="flex flex-col gap-2">
							<Input type="text" bind:value={data.label} />
							<Input type="text" bind:value={data.description} />
						</div>
					{/snippet}

					{#snippet view(data)}
						<div class="flex flex-col gap-2">
							<div class="text-lg font-bold">{data.label}</div>
							<div>{data.description}</div>
						</div>
					{/snippet}
				</SingleRecord>
			{/snippet}
		</List>
	</div>
</div>
