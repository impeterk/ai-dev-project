import {initiateCrawler} from "$lib/server/crawler"
export const actions = {
  default: async({request}) => {
    let formData = await request.formData()
    let domainId = formData.get('domainid')
    let dateOfScan = Date.now()
    const rescanDomain = `https://${domainId}`

    initiateCrawler(rescanDomain, dateOfScan)
  }
}
