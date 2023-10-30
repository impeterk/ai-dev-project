// imports
import { currentLimit, collectionPath, orderField, orderDirection } from "$lib/store"
import { initialLoad } from "$lib/utils/dataLoad.js";


export async function load({ url }) {
    //sets limit for results to fetch from database 
    currentLimit.set(7)
    collectionPath.set('domain')
    orderField.set('name')
    orderDirection.set('asc')

    await initialLoad("domain", "name")

}