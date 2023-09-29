import { initialLoad, nextLoad, previosLoad } from "$lib/utils/dataLoad"
import { lastVisible, firstVisible } from "$lib/store"
import {get} from "svelte/store"

export async function load({url, params}) {
    let {id, date} = params
    let lastId = url.searchParams.get("loadafter") || null
    let firstId = url.searchParams.get("loadbefore") || null
    let data

    if (lastId) {
        let lastRef = get(lastVisible)
        data = await nextLoad(`domain/${id}/dateofscan/${date}/scannedurls`, "url", "asc", lastRef)
    } else if (firstId) {
        let firstRef = get(firstVisible)
        data = await previosLoad(`domain/${id}/dateofscan/${date}/scannedurls`, "url", "asc", firstRef)

    } else {
        data = await initialLoad(`domain/${id}/dateofscan/${date}/scannedurls`, "url")

    }

    return { results: data}
}