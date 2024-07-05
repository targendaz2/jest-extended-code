# jest-extended-code

![GitHub License](https://img.shields.io/github/license/targendaz2/jest-extended-code)
![GitHub Release](https://img.shields.io/github/v/release/targendaz2/jest-extended-code?label=version)
![NPM Version](https://img.shields.io/npm/v/jest-extended-code?logo=npm&logoColor=%23999999)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/targendaz2/jest-extended-code/test.yml?logo=github&label=tests&logoColor=%23999999)

This package adds child process matchers to [Jest](https://jestjs.io).

## Installation

This package is available on npm as [`jest-extended-code`](https://npmjs.com/package/jest-extended-code).

```bash
npm install -D jest jest-extended-code
```

## Set Up

### Individual Matchers

In your Jest configuration file (e.g. `jest.config.ts`), add the matcher to the [`setupFilesAfterEnv`](setupFilesAfterEnv) setting.

```TypeScript
const config = {
    setupFilesAfterEnv = ['jest-extended-code/matchers/toOutput.js']
};
```

### All Matchers

Follow the "Individual Matchers" instructions above using `jest-extended-code` instead of any specific matcher.

```TypeScript
const config = {
    setupFilesAfterEnv = ['jest-extended-code']
};
```

## Matchers

- `.toEqualCode()`
- `.toOutput()`

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

This package is licensed under the [MIT License](https://github.com/targendaz2/jest-extended-code/blob/main/LICENSE).
