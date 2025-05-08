<script>
	import { hasContext } from 'svelte';
	import { List } from './website/components';
	import MarkdownText from './website/components/MarkdownText.svelte';
	import PlainText from './website/components/PlainText.svelte';
	import SingleRecord from './website/components/SingleRecord.svelte';
	import { Button, buttonVariants, cn, Subheading } from '@fuxui/base';
	import { base } from '$app/paths';
	import ThemeWrapper from './website/ThemeWrapper.svelte';
	import { getContext } from 'svelte';
	import Profile from './Profile.svelte';
	import Head from './website/Head.svelte';
	import EditHead from './website/EditHead.svelte';
	import { parseUri } from './website/data';

	const did = getContext('did');
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
		<SingleRecord collection="dev.flo-bit.about" rkey="test">
			{#snippet child(data)}
				<PlainText
					class="text-base-900 dark:text-base-50 text-5xl font-bold"
					key="title"
					placeholder="Title"
					{data}
				/>
				<Button
					href={hasContext('isEditing') ? undefined : base + '/edit'}
					class={cn(
						'mt-12 rounded-full',
						hasContext('isEditing') && 'pointer-events-none active:scale-100'
					)}
					size="lg"
				>
					<PlainText key="editButton" defaultContent="Edit Website" {data} />
				</Button>
				<MarkdownText
					size="lg"
					class="mt-12"
					key="content"
					placeholder="Write something about yourself..."
					{data}
				/>
			{/snippet}
		</SingleRecord>

		<SingleRecord collection="dev.flo-bit.blog" rkey="self">
			{#snippet child(data)}
				<PlainText
					class="text-base-900 dark:text-base-50 mt-16 text-xl font-semibold sm:text-2xl"
					key="title"
					defaultContent="My Blog"
					{data}
				/>
			{/snippet}
		</SingleRecord>

		<div class="group relative mt-6 flex flex-col gap-4">
			<List collection="dev.flo-bit.blog.entry">
				{#snippet item(data, deleteItem)}
					<div class="relative mt-2 flex flex-col gap-2 p-2">
						<div class="pointer-events-none z-10 font-bold">
							<PlainText
								class="text-base-900 dark:text-base-50"
								key="title"
								{data}
								placeholder="Write a label..."
							/>
						</div>
						<div class="pointer-events-none z-10">
							<PlainText
								class="text-base-800 dark:text-base-200 text-sm italic"
								key="description"
								{data}
								placeholder="Write a description..."
							/>
						</div>
						<div class="pointer-events-none z-10">
							<!-- date: createdAt -->
							<div class="text-base-800 dark:text-base-200 text-xs">
								{new Date(data.value.createdAt || new Date()).toLocaleDateString('en-us', {
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								})}
							</div>
						</div>

						{#if hasContext('isEditing')}
							<Button
								class="absolute top-0 right-0 z-10 hidden"
								size="icon"
								variant="ghost"
								onclick={deleteItem}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
								</svg>
								<span class="sr-only">delete</span>
							</Button>

							<Button
								class="absolute top-0 right-0 z-10"
								size="icon"
								variant="ghost"
								href={base + '/blog/' + parseUri(data.uri).rkey + '/edit'}
							>
								<span class="sr-only">edit</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
									/>
								</svg>
							</Button>
						{:else}
							<a
								href={base + '/blog/' + parseUri(data.uri).rkey}
								class="hover:bg-base-200/30 dark:hover:bg-base-800/20 absolute -inset-2 rounded-2xl"
							>
								<span class="sr-only">
									{data.title}
								</span>
							</a>

							<a class="hidden" href={base + '/blog/' + parseUri(data.uri).rkey + '/edit'}>
								<span class="sr-only">edit</span>
							</a>
						{/if}
					</div>
				{/snippet}

				{#snippet addItem(add)}
					<Button class="absolute -bottom-8 left-0" size="sm" href={base + '/blog/add'}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>

						Create Post
					</Button>
				{/snippet}

				{#snippet empty()}
					<div class="text-base-800 dark:text-base-200 text-sm italic">No blog posts yet.</div>
				{/snippet}
			</List>
		</div>

		<div class="mt-16 flex flex-col gap-4">
			<SingleRecord collection="dev.flo-bit.about" rkey="self">
				{#snippet child(data)}
					<PlainText
						class="text-base-900 dark:text-base-50 text-xl font-semibold sm:text-2xl"
						key="title"
						defaultContent="About me"
						{data}
					/>

					<MarkdownText size="lg" key="content" defaultContent="About me..." {data} />
				{/snippet}
			</SingleRecord>
			<SingleRecord collection="app.bsky.actor.profile" rkey="self">
				{#snippet child(data)}
					<Profile {data} {did} />
				{/snippet}
			</SingleRecord>
		</div>
	</div>
</ThemeWrapper>
