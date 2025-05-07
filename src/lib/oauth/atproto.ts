import { AtpBaseClient } from '@atproto/api';
import { client } from './auth.svelte';

export async function resolveHandle({ handle }: { handle: string }) {
	const agent = new AtpBaseClient({ service: 'https://api.bsky.app' });

	const data = await agent.com.atproto.identity.resolveHandle({ handle });
	return data.data.did;
}

const didPDSCache: Record<string, string> = {};

const getPDS = async (did: string) => {
	if (did in didPDSCache) return didPDSCache[did];
	const res = await fetch(
		did.startsWith('did:web')
			? `https://${did.split(':')[2]}/.well-known/did.json`
			: 'https://plc.directory/' + did
	);

	return res.json().then((doc) => {
		if (!doc.service) throw new Error('No PDS found');
		for (const service of doc.service) {
			if (service.id === '#atproto_pds') {
				didPDSCache[did] = service.serviceEndpoint.toString();
			}
		}
		return didPDSCache[did];
	});
};

export async function getProfile({ agent, did }: { agent: AtpBaseClient; did: string }) {
	const { data } = await agent.app.bsky.actor.getProfile({ actor: did });
	return data;
}

export async function listRecords({
	did,
	collection,
	cursor
}: {
	did: string;
	collection: string;
	cursor?: string;
}) {
	const pds = await getPDS(did);

	const agent = new AtpBaseClient({ service: pds });

	const room = await agent.com.atproto.repo.listRecords({
		repo: did,
		collection,
		limit: 100,
		cursor
	});

	return room.data.records;
}

export async function getRecord({
	did,
	collection,
	rkey
}: {
	did: string;
	collection: string;
	rkey: string;
}) {
	const pds = await getPDS(did);

	const agent = new AtpBaseClient({ service: pds });

	const room = await agent.com.atproto.repo.getRecord({
		repo: did,
		collection,
		rkey
	});

	return room.data;
}

export async function putRecord({
	collection,
	rkey,
	record
}: {
	collection: string;
	rkey: string;
	record: Record<string, unknown>;
}) {
	if (!client.profile || !client.rpc) throw new Error('No profile or rpc');

	console.log('updating record', {
		data: {
			collection,
			repo: client.profile.did,
			rkey,
			record: {
				...record
			}
		}
	});
	const response = await client.rpc.call('com.atproto.repo.putRecord', {
		data: {
			collection,
			repo: client.profile.did,
			rkey,
			record: {
				...record
			}
		}
	});

	return response;
}

export async function deleteRecord({
	did,
	collection,
	rkey
}: {
	did: string;
	collection: string;
	rkey: string;
}) {
	if (!client.profile || !client.rpc) throw new Error('No profile or rpc');

	const response = await client.rpc.call('com.atproto.repo.deleteRecord', {
		data: {
			collection,
			repo: did,
			rkey
		}
	});

	return response;
}
