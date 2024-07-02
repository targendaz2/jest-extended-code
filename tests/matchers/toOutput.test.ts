import { beforeAll, describe, expect, test } from '@jest/globals';
import 'jest-extended-fs';
import { ExecutionError } from '../../src/errors.js';
import '../../src/matchers/toOutput.js';
import { createTmpFile } from '../fixtures.js';

let tmpScript: string;
let errorScript: string;

beforeAll(() => {
    tmpScript = createTmpFile({
        content: 'console.log("Hello, world!");',
        mode: 0o766,
    });

    errorScript = createTmpFile({
        content: 'console.log("Hello, world!);',
        mode: 0o766,
    });
});

describe('toOutput matcher tests', () => {
    test('passes when the given script outputs the given text', () => {
        expect(tmpScript).toOutput('Hello, world!');
    });

    test('fails when the given script does not output the given text', () => {
        expect(() =>
            expect(tmpScript).toOutput('Good morning, world!'),
        ).toThrowError();
    });

    test('fails when the given script throws an error', () => {
        expect(() =>
            expect(errorScript).toOutput('Good morning, world!'),
        ).toThrowError(ExecutionError);
    });
});

describe('not toOutput matcher tests', () => {
    test('fails when the given script outputs the given text', () => {
        expect(() =>
            expect(tmpScript).not.toOutput('Hello, world!'),
        ).toThrowError();
    });

    test('passes when the given script does not output the given text', () => {
        expect(tmpScript).not.toOutput('Good morning, world!');
    });

    test('fails when the given script throws an error', () => {
        expect(() =>
            expect(errorScript).not.toOutput('Good morning, world!'),
        ).toThrowError(ExecutionError);
    });
});
