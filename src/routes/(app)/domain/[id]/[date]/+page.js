import { initialLoad } from "$lib/utils/dataLoad"
import { currentLimit, collectionPath, orderField, orderDirection } from "$lib/store"

export async function load({ url, params }) {
    let { id, date } = params

    currentLimit.set(10)
    collectionPath.set(`domain/${id}/dateofscan/${date}/scannedurls`)
    orderField.set('url')
    orderDirection.set('asc')
    await initialLoad(`domain/${id}/dateofscan/${date}/scannedurls`, "url")
}