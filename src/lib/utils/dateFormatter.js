import { userLocale } from "$lib/store"
import { get } from "svelte/store"

export function dateFormatter(date, locals = get(userLocale)) {

    return Intl.DateTimeFormat(locals, { dateStyle: "long" }).format(new Date(parseInt(date)))

}

export function timeFormatter(date, locals = get(userLocale)) {
    return Intl.DateTimeFormat(locals, { timeStyle: "short" }).format(new Date(parseInt(date)))

}