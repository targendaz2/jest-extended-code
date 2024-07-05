export function serializeCode(code: any): string {
    switch (typeof code) {
        case 'string':
            return code;
        case 'function':
            return code.toString();
        case 'object':
            return JSON.stringify(code);
        default:
            throw new TypeError('The format of the actual code is invalid.');
    }
}
