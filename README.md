# flat-webpack-config
A flat configuration helper for webpack

## Install

`npm install flat-webpack-config`

## Usage

### Don't forget to declare your `package.json` `main` field

###Create a `flat-webpack-config.json`

```json
{
  "bundles": {
    "app": {
      "dependency-alias": {
        "name": "module-name",
        "file": "./module-file.js"
      }
    },
    "polyfills": {
      "polyfill-1-alias": {
        "name": "polyfill-1-name",
        "file": "./polyfill-1-file.js"
      },
      "polyfill-2-alias": {
        "name": "polyfill-2-name",
        "file": "./polyfill-2-file.js"
      }
    }
  },
  "map": false,
  "output": "./assets/js",
  "spaces": 2
}
```

### Create a `webpack.config.js`

```js
'use strict';

const
flat = require('flat-webpack-config');

module.exports = flat(__dirname);
```

### Run webpack

`webpack`