import prettier from '@prettier/sync';
import { prettierConfig } from '../config.js';

export function formatCode(code: string) {
    const correctedCode = code
        .split(/\r?\n/)
        .filter((line) => line.trim() !== '')
        .join('\n');

    // The SyntaxError Prettier throws isn't the built-in SyntaxError.
    // I couldn't figure out where that error class is defined. For testing
    // purposes, I'm converting whatever SyntaxError Prettier throws to the
    // built-in one.
    let formattedCode: string = '';
    try {
        formattedCode = prettier.format(correctedCode, prettierConfig);
    } catch (err) {
        const typedErr = err as Error;
        switch (typedErr.name) {
            case 'SyntaxError':
                throw new SyntaxError(typedErr.message, {
                    cause: typedErr.cause,
                });
            default:
                throw typedErr;
        }
    }

    return formattedCode;
}
