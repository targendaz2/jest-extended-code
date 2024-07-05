import type { Options } from 'prettier';

export const prettierConfig: Options = {
    parser: 'babel',
    bracketSpacing: true,
    singleQuote: true,
    semi: true,
    tabWidth: 4,
    trailingComma: 'all',
};
