<script>
	import { hasContext } from 'svelte';
	import { List } from './website/components';
	import MarkdownText from './website/components/MarkdownText.svelte';
	import PlainText from './website/components/PlainText.svelte';
	import SingleRecord from './website/components/SingleRecord.svelte';
	import { Button } from '@fuxui/base';
</script>

<div class="mx-auto max-w-2xl py-16 px-4">
	<SingleRecord collection="dev.flo-bit.about" rkey="test">
		{#snippet child(data)}
			<PlainText class="text-3xl font-bold" key="title" placeholder="Title" {data} />
			<MarkdownText class="mt-8" key="content" placeholder="Write something about yourself..." {data} />
		{/snippet}
	</SingleRecord>

	<div class="relative flex flex-col gap-4 mt-8">
		<List collection="link.flo-bit.dev">
			{#snippet item(data, deleteItem)}
				<div class="relative mt-4 flex flex-col gap-2">
					<div class="pointer-events-none z-10 font-bold">
						<PlainText key="label" {data} placeholder="Write a label..." />
					</div>
					<div class="pointer-events-none z-10">
						<PlainText key="description" {data} placeholder="Write a description..." />
					</div>

					{#if hasContext('isEditing')}
						<Button class="absolute top-0 right-0 z-10" size="icon" variant="ghost" onclick={deleteItem}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
							</svg>
							<span class="sr-only">delete</span>
						</Button>
					{:else}
						<a
							href={data.url}
							target="_blank"
							class="hover:bg-base-200/50 absolute -inset-2 rounded-2xl"
						>
							<span class="sr-only">
								{data.label}
							</span></a
						>
					{/if}
				</div>
			{/snippet}

			{#snippet addItem(add)}
				<Button class="absolute -bottom-16 left-0" onclick={add}>Add link</Button>
			{/snippet}
		</List>
	</div>
</div>
