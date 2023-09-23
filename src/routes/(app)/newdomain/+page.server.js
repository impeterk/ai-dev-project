import { firestore } from "$lib/firebase"
import { addDoc, collection, getDocs } from "firebase/firestore"

let domainRef = collection(firestore, "domain")

export const actions = {
  default: async ({ request }) => {
    // get the form data
    const formData = await request.formData()
    let domain = formData.get('newDomain')

    // cleans input before adding into database
    if (domain.includes('https://')) {
      domain = domain.replace('https://', '')
    }

    // checks if  the domain exists in the database
    // if does, returns message for user and domain is not added

    // array of all domains => possible refactor for the future
    let domainsCollection = await (await getDocs(domainRef)).docs.map(doc => doc.data().name)

    if (domainsCollection.includes(domain)) {
      console.log('domain already exists')
      return {
        status: 'aborted',
        message: "domain is already registered"
      }
    }

    // adds new domain into database
    return await addDoc(domainRef, {
      name: domain,
      date: Date.now(),
      status: "added"
    })
      .then(() => {
        return {
          status: "success",
          message: "Domain has been added"
        }
      })
      .catch((error) => {
        return {
          status: "error",
          message: error
        }
      })



  }

}
