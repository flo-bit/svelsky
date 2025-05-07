<script lang="ts">
	import Website from '$lib/Website.svelte';
	import { setContext } from 'svelte';
	import { BlueskyLogin } from '@fuxui/social';
	import { client, login } from '$lib/oauth/auth.svelte.js';
	import { Button } from '@fuxui/base';
	import type { UpdateFunction } from '$lib/website/data.js';

	let updateFunctions: UpdateFunction[] = $state([]);

	let { data } = $props();

	setContext('isEditing', true);
	setContext('did', data.did);
	setContext('updateFunctions', updateFunctions);
</script>

<Website />

<Button
	class="absolute right-2 bottom-2"
	onclick={() => {
		for (const updateFunction of updateFunctions) {
			updateFunction();
		}
	}}
>
	Update
</Button>

{#if !client.isInitializing && !client.isLoggedIn}
	<div class="absolute left-2 bottom-2">
		<BlueskyLogin
			login={async (handle) => {
				await login(handle);
				return true;
			}}
		/>
	</div>
{/if}
