import { firestore } from '$lib/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { adjustDomain } from '../../../lib/utils/adjustDomain.js';

let domainRef = collection(firestore, 'domain');

export const actions = {
  // registers new domain in the database
  registernewdomain: async ({ request }) => {
    // get the form data
    const formData = await request.formData();
    let domain = formData.get('newDomain');

    // cleans input before adding into database with adjust domain funciton
    domain = adjustDomain(domain);
    /** 
    *  checks if  the domain exists in the database
    *  if does, returns message for user and domain is not added
    *  array of all domains => possible refactor for the future
    */
    let domainsCollection = (await getDocs(domainRef)).docs.map((doc) => doc.data().name);

    if (domainsCollection.includes(domain)) {
      console.log('domain already exists');
      return {
        status: 'error',
        message: 'domain is already registered'
      };
    }

    // adds new domain into database and returns status to the user
    return await addDoc(domainRef, {
      name: domain,
      date: Date.now(),
      status: 'added'
    })
      .then((doc) => {
        return {
          newDomainId: doc.id,
          status: 'success',
          message: 'Domain has been added'
        };
      })
      .catch((error) => {
        return {
          status: 'error',
          message: error
        };
      });
  }
};
