import { expect } from '@jest/globals';
import { ValueError } from 'error-wave';
import type { MatcherFunction } from 'expect';
import utils from 'jest-matcher-utils';
import { formatCode } from '../lib/formatters.js';
import { serializeCode } from '../lib/serializers.js';

const toEqualCode: MatcherFunction<[code: any]> = function (actual, code) {
    if (actual === '') {
        throw new ValueError('The actual value must not be empty!');
    } else if (code === '') {
        throw new ValueError('The expected value must not be empty!');
    }

    const serializedActual = serializeCode(actual);
    const serializedExpected = serializeCode(code);

    const formattedActual = formatCode(serializedActual);
    const formattedExpected = formatCode(serializedExpected);

    const pass = formattedActual === formattedExpected;
    return {
        pass,
        message: pass
            ? () =>
                  `expected the code not to be equal\n${utils.diff(formattedActual, formattedExpected)}`
            : () =>
                  `expected the code to be equal\n${utils.diff(formattedActual, formattedExpected)}`,
    };
};

expect.extend({ toEqualCode });

declare module 'expect' {
    interface AsymmetricMatchers {
        /** Checks that a block of code matches the expected block of code. */
        toEqualCode(code: any): void;
    }
    interface Matchers<R> {
        /** Checks that a block of code matches the expected block of code. */
        toEqualCode(code: any): R;
    }
}
