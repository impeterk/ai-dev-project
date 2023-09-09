import {language} from "$lib/store"
export async function handle({event, resolve}) {
  let headerLanguage = event.request.headers.get('accept-language').split(',').at(0)
  language.set(
    headerLanguage
  )
  const response = await resolve(event)
  return response
}
