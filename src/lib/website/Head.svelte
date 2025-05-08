<script>
	import { Head } from '@fuxui/base';

	let { data } = $props();
</script>

<Head title={data?.value?.title ?? 'hello there'} emojiFavicon={data?.value?.favicon ?? '👋'} />
