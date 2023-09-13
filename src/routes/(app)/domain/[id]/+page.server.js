import { initiateScan } from '$lib/server/scanner/index.js'
export const actions = {
  default: async ({ request }) => {
    let formData = await request.formData()
    let domainId = formData.get('domainid')
    const rescanDomain = `https://${domainId}`

    initiateScan(rescanDomain)

  }
}
