<script lang="ts">
	import { getContext, setContext, type Snippet } from 'svelte';
	import { parseUri } from './data';
	import type { UpdateFunction, UpdateRecordFunction } from './context';
	import { putRecord } from '$lib/oauth/atproto';

	let {
		data,
		child
	}: {
		data: Record<string, any>;
		child: Snippet<[any]>;
	} = $props();

	let updateRecordFunctions: UpdateRecordFunction[] = $state([]);
	setContext('updateRecord', updateRecordFunctions);

	const updateFunctions = getContext('updateFunctions') as UpdateFunction[];

	const update = async () => {
		const updated: Record<string, any> = {};
		
		for (const updateFunction of updateRecordFunctions) {
			const updatedPart = await updateFunction();
			for (const key in updatedPart) {
				updated[key] = updatedPart[key];
				data.value[key] = updatedPart[key];
			}
		}

		if (Object.keys(updated).length > 0) {
			data.value.updatedAt = new Date().toISOString();
			const { collection, rkey } = parseUri(data.uri);
			await putRecord({ collection, rkey, record: data.value });
			return true;
		}

		return false;
	};

	if (updateFunctions) {
		updateFunctions.push(update);
	}
</script>

{@render child(data.value)}
