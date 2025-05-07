import { PUBLIC_HANDLE } from '$env/static/public';
import { resolveHandle } from '$lib/oauth/atproto';

export async function load() {
	const did = await resolveHandle({ handle: PUBLIC_HANDLE });

	return { did };
}
