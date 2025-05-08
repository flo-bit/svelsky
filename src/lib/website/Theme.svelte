<script lang="ts">
	let { data, children, class: className } = $props();
</script>

<div
	class={[
		'theme',
		data.value.accent,
		data.value.base,
		'bg-base-50 dark:bg-base-950 min-h-[100dvh] overflow-y-auto py-16',
		className
	]}
>
	{@render children?.()}
</div>
