import { writable } from "svelte/store"

export const placeholder = writable(
  { url: 'https://tangit.sk' }
)

export const language = writable('en')
