import { checkQueue } from '$lib/server/scanQueue';


/**
 * starts the scanner by checking the queue
 *  @type {import('./$types').RequestHandler} */
export async function GET() {
    checkQueue()
    return new Response('Scan queue initiated', {
        status: 200,
        statusText: 'OK'
    });
}