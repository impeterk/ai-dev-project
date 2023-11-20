import { reset } from '../../lib/store/auth';
import { redirect } from '@sveltejs/kit';

export async function load() {
    reset();

    throw redirect(302, '/login');
}
