// collections and records we want to grab
export const data = {
	'dev.flo-bit.about': ['self'],
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
