import { initiateCrawler } from '$lib/server/crawler.js'

export const actions = {
    default: async ({ request }) => {
        // get the form
        const formData = await request.formData()

        // get the specific field from form
        const domain = formData.get('domain')

        // call the server side function
        const response = await initiateCrawler(domain);

        // Return the data back 
        return {success: true, crawlResult: response};
    }
}