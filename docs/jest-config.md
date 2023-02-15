# Jest Configuration

## Installation

```
npm install --save-dev jest
```

or

```
yarn add --dev jest
```

## Setup
Create file **jest.config.json** then adding these lines

```
{
  "preset": "react-native",
  "roots": ["<rootDir>/src"],
  "collectCoverage": true,
  "moduleFileExtensions": ["ts", "tsx", "js"],
  "transform": {
    "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
    "\\.(ts|tsx)$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  "testPathIgnorePatterns": ["\\.snap$", "<rootDir>/node_modules/"],
  "cacheDirectory": ".jest/cache"
}

```

`preset`: "react-native" specifies that Jest should use the preset configuration for React Native projects.

`roots`: ["<rootDir>/src"] tells Jest where to look for the source code files to test. In this case, it is set to look in the /src directory of the project's root directory.

`collectCoverage`: true indicates that Jest should collect code coverage information.

`moduleFileExtensions`: ["ts", "tsx", "js"] lists the file extensions that Jest should consider as modules.

`transform`: {...} specifies the transformation process that Jest should apply to the files it is testing. The code transforms JavaScript files using Babel and TypeScript files using ts-jest.

`testRegex`: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$" specifies the regular expression pattern for test files. In this case, Jest will look for files with a .test.ts, .test.tsx, or .test.js extension in the /__tests__ directory, or with a .spec.ts, .spec.tsx, or .spec.js extension.

`testPathIgnorePatterns`: ["\\.snap$", "<rootDir>/node_modules/"] lists the file paths that Jest should ignore when running tests. In this case, it is ignoring .snap files and files in the node_modules directory.

`cacheDirectory`: ".jest/cache" specifies the directory where Jest should store its cache files.

## Feedback
If you have any feedback, please reach out to us at ...
## License
[MIT](https://choosealicense.com/licenses/mit/)
## Support
For support, email ... or join our Slack channel.
