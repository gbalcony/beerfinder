export function getValues(value: unknown) {
    const values: unknown[] = [];
    getValuesInner(value, values);
    return values;
}

function getValuesInner(value: unknown, values: unknown[]) {
    if (typeof value === 'object' && value !== null) {
        Object.keys(value).forEach(key => {
            getValuesInner(value[key as keyof typeof value], values);
        });
    } else {
        values.push(value);
    }
}

export function getTextValues(object: object) {
    const values = getValues(object);
    return values.map(value => String(value));
}

export function isSubstring(substring: string, strings: string[]) {
    return strings.some(str => str.includes(substring));
}