<script lang="ts">
	import { getContext, hasContext, type Snippet } from 'svelte';
	import type { Collection } from './data';
	import { data as recordData } from './data';
	import type { UpdateFunction } from './context';

	type ArrayCollections = {
		[K in Collection]: (typeof recordData)[K] extends readonly any[] ? K : never;
	}[Collection];

	type ElementType<C extends Collection> = (typeof recordData)[C] extends readonly (infer U)[]
		? U
		: any;

	type Props =
		| {
				collection: ArrayCollections;
				rkey?: ElementType<ArrayCollections>;
				data: Record<string, any>;
				key: string;
				placeholder?: string;
				defaultContent?: string;

				editing: Snippet<[any, any]>;
				view: Snippet<[any]>;
		  }
		| {
				collection: Exclude<Collection, ArrayCollections>;
				rkey: ElementType<Exclude<Collection, ArrayCollections>>;
				data: Record<string, any>;
				key: string;
				placeholder?: string;
				defaultContent?: string;

				editing: Snippet<[any, any]>;
				view: Snippet<[any]>;
		  };

	let {
		data,
		editing,
		view
	}: Props = $props();

	const updateFunctions = getContext('updateFunctions') as UpdateFunction[];

	const update = async () => {
		console.log('update', data);
		return true;
	};

	if(updateFunctions) {
		updateFunctions.push(update);
	}

	function willUpdate() {
		console.log('willUpdate', data);
		return true;
	}
</script>

{#if hasContext('isEditing')}
	{@render editing(data.value, willUpdate)}
{:else}
	{@render view(data.value)}
{/if}
