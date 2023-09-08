import {firestore} from "$lib/firebase"
import { redirect } from "@sveltejs/kit";
import {doc, setDoc, addDoc, collection } from "firebase/firestore"
import { initiateCrawler } from "$lib/server/crawler";

export const actions = {
  default: async ({ request }) => {
    // get the form
    let dateOfCreation = Date.now()
    const formData = await request.formData()

    const newDomain = formData.get('newDomain')
    // adds new domain into database
	let newEntry = newDomain.replace("https://", '')
    await setDoc(doc(firestore, "domain", newEntry) , {status: "added"} )

    initiateCrawler(newDomain, dateOfCreation)

    throw new redirect(307, '/')


  }

}
