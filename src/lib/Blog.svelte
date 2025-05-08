<script>
	import { hasContext } from 'svelte';
	import MarkdownText from './website/components/MarkdownText.svelte';
	import PlainText from './website/components/PlainText.svelte';
	import SingleRecord from './website/components/SingleRecord.svelte';
	import { getCurrent } from './website/data';
	import EditHead from './website/EditHead.svelte';
	import ThemeWrapper from './website/ThemeWrapper.svelte';
	import Head from './website/Head.svelte';

	const { collection, rkey } = getCurrent();
</script>

<SingleRecord collection="dev.flo-bit.head" rkey="self">
	{#snippet child(data)}
		{#if hasContext('isEditing')}
			<EditHead {data} />
		{:else}
			<Head {data} />
		{/if}
	{/snippet}
</SingleRecord>

<ThemeWrapper>
	<div class={['mx-auto my-16 max-w-2xl px-4']}>
		<SingleRecord {collection} {rkey}>
			{#snippet child(data)}
				<div class="text-base-800 dark:text-base-200 text-xs">
					{new Date(data.value.createdAt || new Date()).toLocaleDateString('en-us', {
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					})}
				</div>
				<PlainText
					class="text-base-900 dark:text-base-50 mt-2 text-3xl font-bold"
					key="title"
					placeholder="Title"
					{data}
				/>

				<PlainText
					class="text-base-800 dark:text-base-200 mt-4 text-sm italic"
					key="description"
					placeholder="Description"
					{data}
				/>
				<MarkdownText
					class="mt-8"
					key="content"
					placeholder="Words can be like X-rays if you use them properly - they'll go through anything. You read and you're pierced."
					{data}
				/>
			{/snippet}
		</SingleRecord>
	</div>
</ThemeWrapper>
