import type { IHttpRequestOptions } from 'n8n-workflow';

export function parseLinkHeader(header?: string): { [rel: string]: string } {
	const links: { [rel: string]: string } = {};

	for (const part of header?.split(',') ?? []) {
		const section = part.trim();
		const match = section.match(/^<([^>]+)>\s*;\s*rel="?([^"]+)"?/);
		if (match) {
			const [, url, rel] = match;
			links[rel] = url;
		}
	}

	return links;
}

/**
 * Global preSend hook for reverse proxy/middleware compatibility.
 * Ensures empty POST/PATCH request bodies are sent as '{}' with proper Content-Type header.
 * Required when Komga is behind reverse proxies (e.g., Traefik) with contentTypeNosniff enabled.
 */
export async function normalizeRequestBodyPreSend(
	this: unknown,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	// Only apply to POST and PATCH requests that might have empty bodies
	if (requestOptions.method !== 'POST' && requestOptions.method !== 'PATCH') {
		return requestOptions;
	}

	// Ensure body is always an object
	if (!requestOptions.body || typeof requestOptions.body !== 'object') {
		requestOptions.body = {};
	}

	// Remove empty condition object if it exists
	// Komga can't deserialize empty condition objects
	if (
		requestOptions.body.condition &&
		typeof requestOptions.body.condition === 'object' &&
		Object.keys(requestOptions.body.condition).length === 0
	) {
		delete requestOptions.body.condition;
	}

	// Workaround: n8n strips empty bodies, so we need to stringify it manually
	// when the body is empty to ensure it's sent as '{}'
	// Required for Traefik compatibility (contentTypeNosniff middleware)
	if (Object.keys(requestOptions.body).length === 0) {
		// Convert to string to prevent n8n from stripping it
		requestOptions.body = '{}' as unknown as Record<string, unknown>;
		// Make sure we don't double-encode
		requestOptions.json = false;
		// Set content-type manually
		if (!requestOptions.headers) {
			requestOptions.headers = {};
		}
		(requestOptions.headers as Record<string, string>)['Content-Type'] = 'application/json';
	}

	return requestOptions;
}
