<script>
	import { ThemeToggle } from "@fuxui/base";
	import { setContext } from "svelte";

	let { data, children } = $props();

	setContext('did', data.did);
	setContext('data', data.data);
	setContext('current', data.current);

	$inspect(data);
</script>

{@render children?.()}

<ThemeToggle class="fixed top-2 left-2" />