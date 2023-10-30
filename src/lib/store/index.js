import { writable } from "svelte/store"

export const placeholder = writable(
  { url: 'https://tangit.sk' }
)

export const userLocale = writable(null)


// tracks import entries in current collections for pagination to work
export const firstInCollection = writable(null)
export const firstVisible = writable(null)
export const lastVisible = writable(null)
export const lastInCollection = writable(null)
export const currentCollection = writable(null)
export const currentPage = writable(0)
export const currentLimit = writable(0)
export const collectionPath = writable(null)
export const orderField = writable(null)
export const orderDirection = writable(null)


// breadcrumbs
export const breadcrumbs = writable(new Map())