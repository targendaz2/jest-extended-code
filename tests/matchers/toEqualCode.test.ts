import { describe, expect, test } from '@jest/globals';
import { ValueError } from 'error-wave';
import '../../src/matchers/toEqualCode.js';

const code = 'console.log("Hello, world!");';
const invalidCode1 = 'console.log("Hello, world!)';
const invalidCode2 = 'console.log("Hello, world!") {};';

describe('toEqualCode matcher tests', () => {
    test('passes when the given code is exactly equal', () => {
        expect(code).toEqualCode(code);
    });

    test('passes when the given code is semantically equal', () => {
        expect(code).toEqualCode("    console.log('Hello, world!')");
    });

    test('fails when the given code is not semantically equal', () => {
        expect(() =>
            expect(code).toEqualCode(
                'const greeting = "Hello";\nconsole.log(`${greeting}, world!`);',
            ),
        ).toThrowError();
    });

    test('fails when the actual code is invalid', () => {
        expect(() => expect(invalidCode1).toEqualCode(code)).toThrowError(
            SyntaxError,
        );
    });

    test('fails when the actual code is an empty string', () => {
        expect(() => expect('').toEqualCode(code)).toThrowError(ValueError);
    });

    test('fails when the expected code is invalid', () => {
        expect(() => expect(code).toEqualCode(invalidCode2)).toThrowError(
            SyntaxError,
        );
    });

    test('fails when the expected code is an empty string', () => {
        expect(() => expect(code).toEqualCode('')).toThrowError(ValueError);
    });
});

describe('not toEqualCode matcher tests', () => {
    test('fails when the given code is exactly equal', () => {
        expect(() => expect(code).not.toEqualCode(code)).toThrowError();
    });

    test('fails when the given code is semantically equal', () => {
        expect(() =>
            expect(code).not.toEqualCode("    console.log('Hello, world!')"),
        ).toThrowError();
    });

    test('passes when the given code is not semantically equal', () => {
        expect(code).not.toEqualCode(
            'const greeting = "Hello";\nconsole.log(`${greeting}, world!`);',
        );
    });

    test('fails when the actual code is invalid', () => {
        expect(() => expect(invalidCode1).not.toEqualCode(code)).toThrowError(
            SyntaxError,
        );
    });

    test('fails when the actual code is an empty string', () => {
        expect(() => expect('').not.toEqualCode(code)).toThrowError(ValueError);
    });

    test('fails when the expected code is invalid', () => {
        expect(() => expect(code).not.toEqualCode(invalidCode2)).toThrowError(
            SyntaxError,
        );
    });

    test('fails when the expected code is an empty string', () => {
        expect(() => expect(code).not.toEqualCode('')).toThrowError(ValueError);
    });
});
