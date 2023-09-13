import { firestore } from "$lib/firebase"
import { redirect } from "@sveltejs/kit";
import { doc, setDoc, addDoc, collection } from "firebase/firestore"
import { initiateScan } from "$lib/server/scanner/index.js";

export const actions = {
  default: async ({ request }) => {
    // get the form
    const formData = await request.formData()
    let domain = formData.get('newDomain')
    const startingUrl = formData.get('newDomain')
    // cleans input before adding into database
    if (domain.includes('https://')) {
      domain = domain.replace('https://', '')
    }
    domain = domain.split('/').at(0)
    // adds new entry into database
    await setDoc(doc(firestore, `domain/${domain}`), { status: "added" })
    // starts scan on domain with starting URL
    initiateScan(domain, startingUrl)

    // redirects user to homepage
    throw new redirect(307, '/')


  }

}
