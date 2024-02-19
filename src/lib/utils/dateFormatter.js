import { userLocale } from "$lib/store"
import { get } from "svelte/store"

export function dateTimeFormatter(date, locals = (get(userLocale) || 'en-US')) {

  return {
    date: Intl.DateTimeFormat(locals, { dateStyle: "short" }).format(new Date(parseInt(date))),
    time: Intl.DateTimeFormat(locals, { timeStyle: "short" }).format(new Date(parseInt(date)))

  }

}

