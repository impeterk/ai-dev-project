import { writable } from "svelte/store"

export const placeholder = writable(
  { url: 'https://tangit.sk' }
)

export const language = writable('en')


// tracks import entries in current collections for pagination to work
export const firstInCollection = writable(null)
export const firstVisible = writable(null)
export const lastVisible = writable(null)
export const lastInCollection = writable(null)
export const currentCollection = writable(null)
export const currentPage = writable(0)
export const currentLimit = writable(0)