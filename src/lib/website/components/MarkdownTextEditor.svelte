<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Editor, type Content, type Extensions } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Image from '@tiptap/extension-image';
	import Placeholder from '@tiptap/extension-placeholder';
	import Link from '@tiptap/extension-link';
	import { Prose, type ProseSize } from '@fuxui/base';
	import { marked } from 'marked';
	import { generateJSON } from '@tiptap/core';
	import TurndownService from 'turndown';
	import { RichTextLink } from './extensions/RichTextLink';
	import { getUpdateRecordFunctions } from '../data';

	let element: HTMLElement | undefined = $state();
	let editor: Editor | null = $state(null);

	let loaded = $state(false);

	let edited = $state(false);

	let {
		key,
		data,
		class: className,
		placeholder = '',
		defaultContent = '',
		size = 'md'
	}: {
		key: string;
		data: Record<string, any>;
		class?: string;
		placeholder?: string;
		defaultContent?: string;
		size?: ProseSize;
	} = $props();

	const updateFunctions = getUpdateRecordFunctions();

	const update = async () => {
		if (!edited || !editor) return {};

		edited = false;

		const html = editor.getHTML();

		var turndownService = new TurndownService({
			headingStyle: 'atx',
			bulletListMarker: '-'
		});
		const markdown = turndownService.turndown(html);

		edited = false;

		return {
			[key]: markdown
		};
	};

	onMount(async () => {
		if (!element || editor) return;

		let json: Content = defaultContent ?? '';

		try {
			let html = await marked.parse(data[key] as string);

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
		];

		if (placeholder) {
			extensions.push(
				Placeholder.configure({
					placeholder: placeholder
				})
			);
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
						'outline-none'
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

<Prose class={className} size={size}>
	<div bind:this={element}></div>
</Prose>

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
