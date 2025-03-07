import { JestConfigWithTsJest } from 'ts-jest';

type Reporter = Required<JestConfigWithTsJest>['reporters'][number];

const reporters: Reporter[] =
  process.env.GITHUB_ACTIONS === 'true'
    ? [['github-actions', { silent: false }], 'summary']
    : ['default'];

const config: JestConfigWithTsJest = {
  maxConcurrency: 1,
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  preset: 'ts-jest/presets/default-esm',
  reporters,
  setupFilesAfterEnv: ['jest-extended-fs'],
  testEnvironment: 'node',
  testRegex: '.+\\.test\\.ts$',
};

export default config;
