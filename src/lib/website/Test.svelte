<script lang="ts">
	import { Input } from "@fuxui/base";
	import { getContext } from "svelte";
	import type { UpdateFunction, UpdateRecordFunction } from "./context";
	import PlainTextEditor from "./PlainTextEditor.svelte";

	let { data } = $props();

	console.log(data);

	let label = $state(data.label);
	let description = $state(data.description);

	let updatedLabel = $state(false);
	let updatedDescription = $state(false);
	const update = async () => {
		const updated: Record<string, any> = {};
		if(updatedLabel) {
			updated.label = label;
		}
		if(updatedDescription) {
			updated.description = description;
		}
		return updated;
	};

	const updateFunctions = getContext('updateRecord') as UpdateRecordFunction[];

	if(updateFunctions) {
		updateFunctions.push(update);
	}
</script>

<div class="flex flex-col gap-2">
	<PlainTextEditor class="font-bold" bind:value={label} onchange={() => updatedLabel = true} />
	<PlainTextEditor bind:value={description} onchange={() => updatedDescription = true} />
</div>