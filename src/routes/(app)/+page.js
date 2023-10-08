// imports
import { initialLoad, nextLoad, previosLoad } from "$lib/utils/dataLoad";
import { firstVisible, lastVisible, currentLimit, currentCollection } from "$lib/store"
import { get } from "svelte/store";

export async function load({ url }) {
    // get first and last visible items from collection to provide
    // refs for next / previous load
    let lastId = url.searchParams.get("loadafter") || null
    let firstId = url.searchParams.get("loadbefore") || null
    let data
    //sets limit for results to fetch from database 
    currentLimit.set(7)

    if (lastId) {
        // returns next results after last visible entry
        let lastRef = get(lastVisible)
        data = await nextLoad('domain', "name", "asc", lastRef)
    } else if (firstId) {
        // returns previous results up to first visible entry
        let firstRef = get(firstVisible)
        data = await previosLoad('domain', "name", "asc", firstRef)
    } else {
        // initial load of results
        data = await initialLoad("domain", "name")

    }

    return { domains: data }
}