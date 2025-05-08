import { PUBLIC_HANDLE } from '$env/static/public';
import { getBlob, resolveHandle } from '$lib/oauth/atproto';
import { type RequestHandler } from '@sveltejs/kit';

export const prerender = true;

export const GET: RequestHandler = async ({ params }) => {
	const { cid } = params;
	const handle = PUBLIC_HANDLE;
	const did = await resolveHandle({ handle });

	const imageblob = await getBlob({ did, cid });

	// download image
	const response = await fetch(imageblob);
	const blob = await response.blob();

	return new Response(blob, {
		headers: {
			'Content-Type': 'image/jpeg'
		}
	});
};
