import { currentUserOrgId } from '$lib/store';
import { get } from 'svelte/store';

/**
 * Handles the GET request for the organization server endpoint.
 * Retrieves the current user's organization ID from the store and returns it as a JSON response.
 * @returns {Response} The JSON response containing the current user's organization ID.
 */
export async function GET() {
	const message = get(currentUserOrgId);

	const body = JSON.stringify({ message });

	return new Response(body, {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
