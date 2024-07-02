import cp from 'node:child_process';
import { expect } from '@jest/globals';
import type { MatcherFunction } from 'expect';
import utils from 'jest-matcher-utils';
import { ExecutionError } from '../errors.js';
import { assertPathIsFile } from '../lib/assertions.js';

const toOutput: MatcherFunction<[output: string, interpreter?: string]> =
    function (actual, output, interpreter = 'node') {
        assertPathIsFile(actual);

        const result = cp.spawnSync(interpreter, [actual.toString()], {
            encoding: 'utf8',
            stdio: 'pipe',
        });

        if (result.error) {
            throw result.error;
        } else if (result.status === 1) {
            throw new ExecutionError(result.stderr);
        }

        const actualOutput = result.output
            ? result.output.join(' ').trim()
            : '';

        const pass = actualOutput === output;
        return {
            pass,
            message: pass
                ? () =>
                      `expected "${actual}" not to output ${utils.printExpected(output)}\n${utils.diff(actualOutput, output)}`
                : () =>
                      `expected "${actual}" to output ${utils.printExpected(output)}\n${utils.diff(actualOutput, output)}`,
        };
    };

expect.extend({ toOutput });

declare module 'expect' {
    interface AsymmetricMatchers {
        /** Checks that the output of a script matches an expected value. */
        toOutput(expected: string): void;
    }
    interface Matchers<R> {
        /** Checks that the output of a script matches an expected value. */
        toOutput(expected: string): R;
    }
}
