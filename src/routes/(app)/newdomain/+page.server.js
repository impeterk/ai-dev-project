import {firestore} from "$lib/firebase"
import {doc, setDoc, addDoc, collection } from "firebase/firestore"

export const actions = {
  default: async ({ request }) => {
    // get the form
    let dateOfCreation = Date.now()
    const formData = await request.formData()

    const newDomain = formData.get('newDomain')
    // adds new domain into database
    await setDoc(doc(firestore, "domain", newDomain) , {status: "added"} )
    // addes date of creation as the first date of scan -- might be useful
    await setDoc(doc(firestore, `domain/${newDomain}/dateofscan/${dateOfCreation}`), {})
  }

}
