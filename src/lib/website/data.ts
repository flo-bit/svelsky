import { getProfile, getRecord, listRecords, resolveHandle } from '$lib/oauth/atproto';
import type { Record as ListRecord } from '@atproto/api/dist/client/types/com/atproto/repo/listRecords';
import { getContext } from 'svelte';
import { PUBLIC_HANDLE } from '$env/static/public';

// collections and records we want to grab
export const data = {
	'app.bsky.actor.profile': ['self'],
	'dev.flo-bit.about': ['test', 'self'],
	'dev.flo-bit.theme': ['self'],
	'link.flo-bit.dev': 'all',
	'dev.flo-bit.blog.entry': 'all',
	'dev.flo-bit.blog': ['self'],
	'dev.flo-bit.head': ['self']
} as const;

export const handle = 'flo-bit.dev';

export type Collection = keyof typeof data;

export function parseUri(uri: string) {
	// at://did:plc:257wekqxg4hyapkq6k47igmp/link.flo-bit.dev/3lnblfznvhr2a
	const [did, collection, rkey] = uri.split('/').slice(2);
	return { did, collection, rkey };
}

export type IndividualCollections = {
	[K in Collection]: (typeof data)[K] extends readonly unknown[] ? K : never;
}[Collection];

export type ListCollections = Exclude<Collection, IndividualCollections>;

export type ElementType<C extends Collection> = (typeof data)[C] extends readonly (infer U)[]
	? U
	: unknown;

export type DownloadedData = { [C in Collection]: Record<string, ListRecord> };

export function getData(): DownloadedData {
	return getContext('data');
}

export async function loadData() {
	const did = await resolveHandle({ handle: PUBLIC_HANDLE });

	const profile = await getProfile({ did });

	const downloadedData = {} as DownloadedData;

	for (const collection of Object.keys(data) as Collection[]) {
		const cfg = data[collection];

		try {
			if (Array.isArray(cfg)) {
				for (const rkey of cfg) {
					const record = await getRecord({ did, collection, rkey });
					downloadedData[collection] ??= {} as Record<string, ListRecord>;
					downloadedData[collection][rkey] = record;
				}
			} else if (cfg === 'all') {
				const records = await listRecords({ did, collection });
				downloadedData[collection] = records;
			}
		} catch (error) {
			console.error('failed getting', collection, cfg);
		}
	}

	return { did, data: JSON.parse(JSON.stringify(downloadedData)) as DownloadedData, profile };
}

export type UpdateFunction = () => boolean | Promise<boolean>;

export type UpdateRecordFunction = () => Record<string, unknown> | Promise<Record<string, unknown>>;

export function getUpdateFunctions(): UpdateFunction[] {
	return getContext('updateFunctions');
}

export function getUpdateRecordFunctions(): UpdateRecordFunction[] {
	return getContext('updateRecordFunctions');
}

export function getCurrent(): { collection: ListCollections; rkey: string } {
	return getContext('current');
}
