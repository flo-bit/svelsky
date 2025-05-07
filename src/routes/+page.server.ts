import { getRecord, listRecords, resolveHandle } from '$lib/oauth/atproto';
import { data, type Collection, type CollectionRecord } from '$lib/website/data';

import { PUBLIC_HANDLE } from '$env/static/public';

export type DownloadedData = {
	[C in Collection]: (typeof data)[C] extends readonly (infer U)[]
		? Record<U, unknown>
		: Record<string, unknown>;
};

export async function load() {
	const did = await resolveHandle({ handle: PUBLIC_HANDLE });

	const downloadedData = {} as DownloadedData;

	for (const collection of Object.keys(data) as Collection[]) {
		const cfg = data[collection];

		try {
			if (Array.isArray(cfg)) {
				for (const rkey of cfg as readonly CollectionRecord<typeof collection>[]) {
					const record = await getRecord({ did, collection, rkey });
					downloadedData[collection] ??= {} as Record<string, unknown>;
					downloadedData[collection][rkey] = record;
				}
			} else if (cfg === 'all') {
				const records = await listRecords({ did, collection });
				downloadedData[collection] = records;
			}
		} catch (error) {
			console.error(error);
		}
	}

	return downloadedData;
}
