import { loadData, parseUri, type ListCollections } from '$lib/website/data';

export async function load({ params }) {
	const { uri } = params;
	const { did, data } = await loadData();

	const { collection, rkey } = parseUri(uri) as {
		collection: ListCollections;
		rkey: string;
	};

	return {
		did,
		uri,
		data,
		current: {
			collection,
			rkey
		}
	};
}
