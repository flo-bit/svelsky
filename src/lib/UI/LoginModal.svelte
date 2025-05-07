<script lang="ts" module>
	export const loginModalState = $state({
		visible: false,
		show: () => (loginModalState.visible = true),
		hide: () => (loginModalState.visible = false)
	});
</script>

<script lang="ts">
	import { login } from '$lib/oauth/auth.svelte';
	import Button from './Button.svelte';
	import { tick } from 'svelte';

	let value = $state('');
	let error: string | null = $state(null);
	let loading = $state(false);

	async function onSubmit(event: Event) {
		event.preventDefault();
		if (loading) return;

		error = null;
		loading = true;

		try {
			await login(value);
		} catch (err) {
			error = err instanceof Error ? err.message : String(err);
		} finally {
			loading = false;
		}
	}

	let input: HTMLInputElement | undefined = $state();

	$effect(() => {
		if (!loginModalState.visible) {
			error = null;
			value = '';
			loading = false;
		} else {
			tick().then(() => {
				input?.focus();
			});
		}
	});
</script>

{#if loginModalState.visible}
	<div
		class="fixed inset-0 z-[100] w-screen overflow-y-auto"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<div
			class="fixed inset-0 bg-neutral-50/90 backdrop-blur-sm transition-opacity dark:bg-neutral-950/90"
			onclick={() => (loginModalState.visible = false)}
			aria-hidden="true"
		></div>

		<div class="pointer-events-none fixed inset-0 z-10 w-screen overflow-y-auto">
			<div
				class="flex min-h-full w-screen items-end justify-center p-4 text-center sm:items-center sm:p-0"
			>
				<div
					class="pointer-events-auto relative w-full transform overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 px-4 pt-4 pb-4 text-left shadow-xl transition-all sm:my-8 sm:max-w-sm sm:p-6 dark:border-neutral-700 dark:bg-neutral-800"
				>
					<h3 class="font-semibold text-neutral-900 dark:text-neutral-100" id="modal-title">
						Login With Bluesky
					</h3>
					<form onsubmit={onSubmit} class="mt-4 flex w-full flex-col gap-2">
						<div class="w-full">
							<label
								for="bluesky-handle"
								class="block text-sm/6 font-medium text-neutral-900 dark:text-neutral-100"
								>Your handle</label
							>
							<div class="mt-2">
								<input
									bind:this={input}
									type="text"
									name="bluesky-handle"
									id="bluesky-handle"
									placeholder="yourname.bsky.social"
									bind:value
									class="block w-full rounded-full border-0 py-1.5 text-neutral-900 caret-rose-500 shadow-sm ring-1 ring-neutral-300 ring-inset placeholder:text-neutral-500 focus:ring-2 focus:ring-rose-600 focus:ring-inset sm:text-sm/6 dark:bg-neutral-950 dark:text-neutral-100 dark:ring-neutral-700 dark:placeholder:text-neutral-600"
								/>
							</div>
						</div>

						{#if error}
							<p class="text-sm font-semibold text-rose-500">{error}</p>
						{/if}

						<div class="mt-5 sm:mt-6">
							<Button type="submit" disabled={loading} class="w-full"
								>{loading ? 'Loading...' : 'Login'}</Button
							>
						</div>

						<div class="mt-4 border-t border-neutral-200 pt-4 text-sm leading-7 text-neutral-800">
							Don't have an account?
							<br />
							<a
								href="https://bsky.app"
								target="_blank"
								class="font-medium text-rose-600 hover:text-rose-500"
							>
								Create one on bluesky
							</a>, then sign in here.
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
{/if}
