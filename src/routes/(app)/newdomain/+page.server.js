import { firestore } from '$lib/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { adjustDomain } from '$lib/utils/adjustDomain.js';
import { initiateScan } from '$lib/server/scanner/index.js';


export const actions = {
  // registers new domain in the database
  registernewdomain: async ({ fetch, request }) => {
    // get the form data
    const formData = await request.formData();
    let domain = adjustDomain(await formData.get('newDomain'));


    // post request to API endpoint
    return await fetch('/api/newdomain', {
      method: 'POST',
      body: JSON.stringify({ domain })
    }).then(async (response) => {
      let { status, statusText } = response
      let body = await response.json()
      console.log(body)
      if (status === 400) {
        return {
          status: 'error',
          message: statusText
        }
      }
      return {
        newDomainId: body,
        newDomainName: domain,
        status: 'success',
        message: statusText
      }

    })


    // cleans input before adding into database with adjust domain funciton
    // domain = adjustDomain(domain);
    /** 
    *  checks if  the domain exists in the database
    *  if does, returns message for user and domain is not added
    *  array of all domains => possible refactor for the future
    */
    // let domainsCollection = (await getDocs(domainRef)).docs.map((doc) => doc.data().name);

    // if (domainsCollection.includes(domain)) {
    //   console.log('domain already exists');
    //   return {
    //     status: 'error',
    //     message: 'domain is already registered'
    //   };
    // }

    // // adds new domain into database and returns status to the user
    // return await addDoc(domainRef, {
    //   name: domain,
    //   date: Date.now(),
    //   status: 'added'
    // })
    //   .then((doc) => {
    //     return {
    //       newDomainId: doc.id,
    //       newDomainName: domain,
    //       status: 'success',
    //       message: 'Domain has been added'
    //     };
    //   })
    //   .catch((error) => {
    //     return {
    //       status: 'error',
    //       message: error
    //     };
    //   });
  },

  // performs initial Scan 
  initialscan: async ({ request }) => {
    const dateOfScan = Date.now()

    const formData = await request.formData();
    const domainId = formData.get("newDomainId")
    const startingUrl = formData.get("startingUrl")

    initiateScan(domainId, dateOfScan, startingUrl)

    return {
      status: "started",
      message: "initial scan has started",
      newDomainId: domainId
    }

  }
};
