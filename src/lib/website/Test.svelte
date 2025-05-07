<script>
	let { data } = $props();

	console.log(data);
</script>

<div>
	{data.value.label}:
	{data.value.description}
</div>

