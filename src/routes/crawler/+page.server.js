import { initiateCrawler } from '$lib/server/crawler';

export const actions = {
	default: async ({ request }) => {
		try {
			// get the form
			const formData = await request.formData();

			// get the specific field from form
			const domain = formData.get('domain');

			// call the server side function
			const response = await initiateCrawler(domain);

			// Return the data back
			return { success: true, crawlResult: response };
		} catch (err) {
			console.error('Error on server side:', err);
			return { success: false, crawlResult: 'An unexpected error occurred. Please try again.' };
		}
	}
};
