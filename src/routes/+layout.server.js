export function load({ request }) {
    console.log(request.headers.get('accept-language'))
}