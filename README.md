# flat-webpack-config
A flat configuration helper for webpack

## Install

`npm install flat-webpack-config`

## Usage

### Don't forget to declare your `package.json` `main` field

### Create a `flat-webpack-config.json` like

```json
{
  "bundles": {
    "app": {
      "anticore": {
        "name": "anticore"
      }
    },
    "polyfills": {
      "fetch": {
        "name": "whatwg-fetch"
      },
      "Promise": {
        "name": "es6-promise",
        "file": "./dist/es6-promise.auto.min.js"
      },
      "URL": {
        "name": "js-polyfills",
        "file": "./url.js"
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

module.exports = require('flat-webpack-config')(__dirname);
```

### Run webpack

`webpack`