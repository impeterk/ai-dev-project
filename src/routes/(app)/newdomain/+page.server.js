import { adjustDomain } from '$lib/utils/adjustDomain.js';
import { initiateScan } from '$lib/server/scanner/index.js';


export const actions = {
  // registers new domain in the database
  registernewdomain: async ({ fetch, request }) => {
    // get the form data
    const formData = await request.formData();
    // cleans input before adding into database with adjust domain function
    let domain = adjustDomain(await formData.get('newDomain'));


    // post request to API endpoint
    return await fetch('/api/scan/add', {
      method: 'POST',
      body: JSON.stringify({ domain })
    }).then(async (response) => {
      // descructure response 
      let { status, message, domain = null, newDomainId = null } = await response.json()
      // if there is error ? 'domain is already in database'
      if (status === 'error') {
        return {
          status: status,
          message: message
        }
      }
      // returns new domain name
      return {
        newDomainId: newDomainId,
        newDomainName: domain,
        status: status,
        message: message
      }
    })
  },

  // performs initial Scan 
  initialscan: async ({ fetch, request }) => {

    const formData = await request.formData();
    const domainId = formData.get("newDomainId")
    const startingUrl = formData.get("startingUrl")

    // post request to queue API endpoint
    await fetch('/api/scan/enqueue', {
      method: 'POST',
      body: JSON.stringify({ domainId, startingUrl })
    }).then(async (resp) => {
      if (resp.status === 200) {
        // post request to start the scan
        await fetch('/api/scan/start')
        return {
          status: "started",
          message: "initial scan has started",
          newDomainId: domainId
        }
      }
    })
  }
};
