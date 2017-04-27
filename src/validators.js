export function isNotEmpty (str) {
    const pattern =/\S+/;
    return pattern.test(str);  // returns a boolean
}

export function isLetters (str) {
    const pattern = /^[a-zA-Z]+$/;
    return pattern.test(str);
}

export function isEmailAddress (str) {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return pattern.test(str);  // returns a boolean
}

export function isNumber (str) {
    const pattern = /^\d+$/;
    return pattern.test(str);  // returns a boolean
}

export function isEmptyObject (obj) {
    for(let prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }
    return true;
}