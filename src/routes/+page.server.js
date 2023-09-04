import { redirect } from "@sveltejs/kit";
export const actions = {
    default: async ({ request, url }) => {
        throw redirect(307, '/dashboard');
    }
}