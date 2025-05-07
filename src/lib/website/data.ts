// collections and records we want to grab
export const data = {
	'dev.flo-bit.about': ['self', 'test'],
	'dev.flo-bit.test': ['self'],
	'link.flo-bit.dev': 'all'
} as const;

export const handle = 'flo-bit.dev';

export type Collection = keyof typeof data;
export type Record = (typeof data)[Collection];

export type CollectionRecord<C extends Collection> =
	// does data[C] extend a readonly array?
	(typeof data)[C] extends readonly (infer U)[]
		? U // yes → U is the element type (e.g. "self")
		: any; // no  → value must have been "all"

export function parseUri(uri: string) {
	// at://did:plc:257wekqxg4hyapkq6k47igmp/link.flo-bit.dev/3lnblfznvhr2a
	const [did, collection, rkey] = uri.split('/').slice(2);
	return { did, collection, rkey };
}