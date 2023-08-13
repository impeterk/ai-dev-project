// import { stringAlternation } from '$lib/server'
import { redirect } from "@sveltejs/kit";
export const actions = {
  default: async ({ request, url }) => {
    // const formData = await request.formData()
    //         const string = formData.get('string')
    //         let alteredString = await stringAlternation(string)
    throw redirect(307, '/dashboard');
    return { success: true, }
  }
}
