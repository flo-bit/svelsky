<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import { Editor, type Content, type Extensions } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Image from '@tiptap/extension-image';
	import Placeholder from '@tiptap/extension-placeholder';
	import Link from '@tiptap/extension-link';
	import { Prose } from '@fuxui/base';
	import { getRecord, putRecord } from '$lib/oauth/atproto';
	import { marked } from 'marked';
	import { generateJSON } from '@tiptap/core';
	import type { UpdateFunction } from './context';
	import TurndownService from 'turndown';
	import { client } from '$lib/oauth';
	import { RichTextLink } from './extensions/RichTextLink';

	let element: HTMLElement | undefined = $state();
	let editor: Editor | null = $state(null);

	let loaded = $state(false);

	let edited = $state(false);

	let record: Awaited<ReturnType<typeof getRecord>>;

	let { collection, rkey, key, defaultContent, placeholder }: {
		collection: string;
		rkey: string;
		key: string;
		defaultContent?: string;
		placeholder?: string;
	} = $props();

	const updateFunctions = getContext('updateFunctions') as UpdateFunction[];

	const did = getContext('did') as string;

	const update = async () => {
		console.log('update');

		if (!edited) {
			console.log('not updating, because not edited');
			return false;
		}

		const html = editor?.getHTML();

		if (!html) {
			console.log('not updating, because no html');
			return false;
		}

		var turndownService = new TurndownService({
			headingStyle: 'atx',
			bulletListMarker: '-'
		});
		const markdown = turndownService.turndown(html);

		console.log(markdown);

		if (!client.profile || client.profile.did !== did) {
			console.log('not updating, because not authorized');
			return false;
		}

		await putRecord({
			collection,
			rkey,
			record: {
				...record?.value,
				[key]: markdown,
				updatedAt: new Date().toISOString()
			}
		});

		return true;
	};

	onMount(async () => {
		if (!element || editor) return;

		let json: Content = defaultContent ?? '';

		try {
			record = await getRecord({ did, collection, rkey });

			console.log(record);
			// parse to html
			let html = await marked.parse(record.value[key] as string);

			// parse to json
			json = generateJSON(html, [
				StarterKit.configure(),
				Image.configure(),
				RichTextLink.configure({
					openOnClick: false
				})
			]);
		} catch (error) {
			console.error(error);
		}

		let extensions: Extensions = [
			StarterKit.configure(),
			Image.configure(),
			Link.configure({
				openOnClick: false
			})
		]

		if (placeholder) {
			extensions.push(Placeholder.configure({
				placeholder: placeholder
			}));
		}

		editor = new Editor({
			element: element,
			extensions: extensions,
			onTransaction: () => {
				editor = editor;
			},
			onUpdate: () => {
				edited = true;
			},

			content: json,

			editorProps: {
				attributes: {
					class:
						'outline-none prose dark:prose-invert prose-sm prose-a:no-underline prose-a:text-accent-600 dark:prose-a:text-accent-600 prose-pre:rounded-2xl w-full max-w-2xl'
				}
			}
		});

		updateFunctions.push(update);

		loaded = true;
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}

		updateFunctions.splice(updateFunctions.indexOf(update), 1);
	});
</script>

<Prose>
	<div bind:this={element}></div>
</Prose>

{#if !loaded}
	<p>Loading...</p>
{/if}

<style>
	:global(.tiptap p.is-editor-empty:first-child::before) {
		color: var(--color-base-800);
		content: attr(data-placeholder);
		float: left;
		height: 0;
		pointer-events: none;
	}
	:global(.dark .tiptap p.is-editor-empty:first-child::before) {
		color: var(--color-base-200);
	}
</style>
