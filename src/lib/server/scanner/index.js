import { initiateCrawler } from "../crawler";
import { firestore } from '$lib/firebase'
import { doc, setDoc, addDoc, collection, updateDoc } from "firebase/firestore"


export async function initiateScan(domain, startingUrl = domain) {

    // creates a date when the scan started
    const dateOfScan = Date.now()

    // cleans domain of // for firebase
    if (domain.includes('https://')) {
        domain = domain.replace('https://', '')
    }
    domain = domain.split('/').at(0)

    // add new entry into Data base
    let docRef = doc(firestore, `domain/${domain}`)
    await updateDoc(docRef, { status: "scanning" })
    await setDoc(doc(firestore, `domain/${domain}/dateofscan/${dateOfScan}`), { startinguUrl: startingUrl })

    // starts crawling urls
    await initiateCrawler(startingUrl).then(async (result) => {
        //writes results to database
        result.items.map(item => {
            let slug = item.url.split("/").at(-1)
            if (slug == '') slug = "home"
            addDoc(collection(firestore, `domain/${domain}/dateofscan/${dateOfScan}/scannedurls/`), {
                url: item.url,
                slug,
                meta: item.scrappedData.meta,
                social: item.scrappedData.social,
                headlines: item.scrappedData.body.headlines,
                images: item.scrappedData.body.images,
                schema: item.scrappedData.schema,
                allData: item.allData
            })
        })

        await updateDoc(doc(firestore, `domain/${domain}/dateofscan/${dateOfScan}`), { totalPages: result.items.length })
        await updateDoc(docRef, { status: "finished", })
    }).catch(async () => {
        // in case of error, changes status to aborted
        await updateDoc(docRef, { status: "aborted", })
    })

}