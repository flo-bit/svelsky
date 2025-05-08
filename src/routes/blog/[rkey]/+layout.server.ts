export async function load({ params }) {
	const { rkey } = params;

	const collection = 'dev.flo-bit.blog.entry';

	// console.log(convertPathToUri(uri));
	// const { collection, rkey } = parseUri(convertPathToUri(uri)) as {
	// 	collection: ListCollections;
	// 	rkey: string;
	// };

	return {
		current: {
			collection,
			rkey
		}
	};
}
