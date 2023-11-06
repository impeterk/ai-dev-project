import { firestore } from '$lib/firebase';
import { json } from '@sveltejs/kit';
import { addDoc, collection, getDocs } from 'firebase/firestore';



/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
    const options = {
        status: 418,
        headers: {
            fesak: 'velky'
        }
    }

    return new Response('API endpoint', options);
}

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
    let domainRef = collection(firestore, 'domain');

    let { domain } = await event.request.json()

    let domainsCollection = (await getDocs(domainRef)).docs.map((doc) => doc.data().name)

    if (domainsCollection.includes(domain)) {
        return new Response(JSON.stringify({ status: 'error', message: 'Domain exists' }),
            {
                status: 400,
                statusText: 'domain already exists',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    }
    return await addDoc(domainRef, {
        name: domain,
        date: Date.now(),
        status: 'added'
    }).then((doc) => {
        return new Response(JSON.stringify(doc.id), {
            status: 200,
            statusText: 'Domain has been added',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }).catch((error) => {
        return new Response(JSON.stringify({ error: true }), {
            status: 400,
            statusText: error,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    });
    ;

    return json({ success: true })
}