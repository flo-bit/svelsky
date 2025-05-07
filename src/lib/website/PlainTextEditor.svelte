<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import { Editor, type Extensions } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import type { UpdateRecordFunction } from './context';
	import Placeholder from '@tiptap/extension-placeholder';
	import Paragraph from '@tiptap/extension-paragraph'
	import Document from '@tiptap/extension-document'
	import Text from '@tiptap/extension-text'

	let element: HTMLElement | undefined = $state();
	let editor: Editor | null = $state(null);

	let edited = $state(false);

	const updateFunctions = getContext('updateRecord') as UpdateRecordFunction[];

	let updated = $state(false);

	let {
		key,
		data,
		class: className,
		placeholder = '',
		defaultContent = ''
	}: {
		key: string;
		data: Record<string, any>;
		class?: string;
		placeholder?: string;
		defaultContent?: string;
	} = $props();

	const update = async () => {
		if(updated) {
			updated = false;
			console.log('update', key, editor?.getText());
			return {
				[key]: editor?.getText() ?? ''
			}
		}
		return {};
	};

	onMount(async () => {
		if (!element || editor) return;

		updateFunctions.push(update);

		let extensions: Extensions = [
			Document.configure(),
			Paragraph.configure(),
			Text.configure(),
		];

		if(placeholder) {
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

				updated = true;
			},

			content: data[key] ?? defaultContent,

			editorProps: {
				attributes: {
					class: 'outline-none pointer-events-auto'
				}
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}

		updateFunctions.splice(updateFunctions.indexOf(update), 1);
	});
</script>

<div class={className} bind:this={element}></div>
	
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
