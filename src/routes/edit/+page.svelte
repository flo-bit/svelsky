<script lang="ts">
	import type { UpdateFunction } from '$lib/website/context.js';
	import Website from '$lib/website/Website.svelte';
	import { setContext } from 'svelte';
	import { BlueskyLogin } from '@fuxui/social';
	import { client, login } from '$lib/oauth/auth.svelte.js';
	import { Button } from '@fuxui/base';

	setContext('isEditing', true);

	setContext('did', 'did:plc:257wekqxg4hyapkq6k47igmp');

	let updateFunctions: UpdateFunction[] = $state([]);

	setContext('updateFunctions', updateFunctions);

	let { data } = $props();
</script>

<Website {data} />

<Button
	class="absolute right-2 bottom-2"
	onclick={() => {
		for (const updateFunction of updateFunctions) {
			if (updateFunction()) {
				console.log('updated');
			}
		}
	}}
>
	Update
</Button>

{#if !client.isInitializing && !client.isLoggedIn}
	<div class="absolute right-0 bottom-0">
		<BlueskyLogin
			login={async (handle) => {
				await login(handle);
				return true;
			}}
		/>
	</div>
{/if}
