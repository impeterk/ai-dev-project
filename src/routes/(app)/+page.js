import { initialLoad } from "$lib/utils/initialLoad";
export async function load() {
    let data = await initialLoad("domain", "name")


    return { domains: data, status: "finished" }
}