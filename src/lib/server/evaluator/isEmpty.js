export function isEmpty(data) {
    const dataType = typeof data;

    switch (dataType) {
        case 'string':
            return data.trim().length === 0;

        case 'object':
            // Object covers both Arrays & Objects
            if (data === null) return true;
            if (Array.isArray(data)) return data.length === 0;
            return Object.keys(data).length === 0;

        case 'number':
            // Depending on the use case, a number could be treated as "empty" if it's 0.
            // Here, we assume all numbers are "non-empty".
            return false;

        case 'boolean':
            // A boolean is not empty by definition. However, `false` could be considered "empty"
            // depending on the use case. Here, we assume all booleans are "non-empty".
            return false;

        case 'symbol':
            // A symbol is never empty.
            return false;

        case 'function':
            // A function is not considered empty.
            return false;

        case 'bigint':
            // A bigint is similar to a number and is not considered empty.
            return false;

        case 'undefined':
            // Undefined values are considered empty.
            return true;

        default:
            console.warn(`Unrecognized data type for isEmpty: ${dataType}`);
            return false;
    }
}