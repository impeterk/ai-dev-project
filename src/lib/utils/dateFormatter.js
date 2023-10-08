

export function dateFormatter(date, locals = 'en-US') {

    return Intl.DateTimeFormat(locals, { dateStyle: "long" }).format(new Date(parseInt(date)))

}

export function timeFormatter(date, locals = 'en-US') {
    return Intl.DateTimeFormat(locals, { timeStyle: "short" }).format(new Date(parseInt(date)))

}