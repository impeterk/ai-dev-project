import { addToQueue } from '$lib/server/scanQueue';


/** 
 * adds new scan to queue
 * @type {import('./$types').RequestHandler} */
export async function POST(event) {
    const dateOfScan = Date.now()
    let { domainId, startingUrl, aiToggle } = await event.request.json()

    await addToQueue({ domainId, startingUrl, dateOfScan, aiToggle })

    return new Response(JSON.stringify({ success: true }),
        {
            status: 200,
            statusText: 'scan added to Queue',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}