export function getTextValues(object: object) {
    const values = getValues(object);
    return values.map(value => String(value));
}

function getValues(value: unknown) {
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

export function isSubstring(substring: string, strings: string[]) {
    const substringLowercase = substring.toLowerCase();

    return strings.some(str => {
        const strLowercase = str.toLowerCase();
        return strLowercase.includes(substringLowercase);
    });
}

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }