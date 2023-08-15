import { stringAlternation } from '$lib/server'

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData()
        const string = formData.get('string')

        let alteredString = await stringAlternation(string)
        return { success: true, alteredString }
    }
}