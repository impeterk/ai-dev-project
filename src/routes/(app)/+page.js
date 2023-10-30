// imports
import { currentLimit, collectionPath, orderField, orderDirection } from "$lib/store"
import { initialLoad } from "$lib/utils/dataLoad.js";

export async function load({ url }) {
    // get first and last visible items from collection to provide
    // refs for next / previous load
    let lastId = url.searchParams.get("loadafter") || null
    let firstId = url.searchParams.get("loadbefore") || null
    let data
    //sets limit for results to fetch from database 
    currentLimit.set(7)
    collectionPath.set('domain')
    orderField.set('name')
    orderDirection.set('asc')

    await initialLoad("domain", "name")

}