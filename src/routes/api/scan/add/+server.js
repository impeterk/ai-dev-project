import { firestore } from '$lib/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';

/** 
 * @type {import('./$types').RequestHandler} */
export async function POST(event) {

    let response
    let options = {
        status: null,
        statusText: null,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let domainRef = collection(firestore, 'domain');
    let { domain } = await event.request.json()

    /** 
     *  checks if  the domain exists in the database
     *  if does, returns message for user and domain is not added
     *  array of all domains => possible refactor for the future
    */
    let domainsCollection = (await getDocs(domainRef)).docs.map((doc) => doc.data().name)
    if (domainsCollection.includes(domain)) {
        response = { status: 'error', message: 'Domain already exists' }
        options.status = 400
        options.statusText = 'domain, already exists'
        return new Response(JSON.stringify(response), options)

    }
    // adds new domain into database
    await addDoc(domainRef, {
        name: domain,
        date: Date.now(),
        status: 'added'
    }).then((doc) => {
        response = { newDomainId: doc.id, domain, status: 'success', message: 'Domain has been added' }
        options.status = 200
        options.statusText = 'Domain has been added'
    }).catch((error) => {
        response = { status: 'error', message: error }
        options.status = 400
        options.statusText = 'Database Error'
    });

    // Returns response to user
    return new Response(JSON.stringify(response), options)
}