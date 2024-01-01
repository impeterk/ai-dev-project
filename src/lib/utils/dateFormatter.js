import { userLocale } from "$lib/store"
import { get } from "svelte/store"

export function dateFormatter(date, locals = (get(userLocale) || 'en-US')) {

    return Intl.DateTimeFormat(locals, { dateStyle: "short" }).format(new Date(parseInt(date)))

}

export function timeFormatter(date, locals = (get(userLocale) || 'en-US')) {
    return Intl.DateTimeFormat(locals, { timeStyle: "short" }).format(new Date(parseInt(date)))

}