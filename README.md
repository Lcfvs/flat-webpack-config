# flat-webpack-config
A flat configuration helper for webpack

## Install

`npm i -d flat-webpack-config`

## Usage

### Initialize your module

```sh
mkdir project-name
cd project-name
npm init
npm i -d flat-webpack-config
```

### Create a `flat-webpack-config.json`

```json
{
  "bundles": {
    "app": {
      "anticore": "anticore"
    },
    "polyfills": {
      "fetch": "whatwg-fetch",
      "Promise": "es6-promise/dist/es6-promise.auto.min.js",
      "URL": "js-polyfills/url.js"
    }
  },
  "map": true,
  "output": "./assets/js",
  "spaces": 2
}
```

### Create a `webpack.config.js`

```js
'use strict';

module.exports = require('flat-webpack-config')(__dirname);

// or avoid the `flat-webpack-config.json` file by
module.exports = require('flat-webpack-config')(__dirname, {
  "bundles": {
    "app": {
      "anticore": "anticore"
    },
    "polyfills": {
      "fetch": "whatwg-fetch",
      "Promise": "es6-promise/dist/es6-promise.auto.min.js",
      "URL": "js-polyfills/url.js"
    }
  },
  "map": true,
  "output": "./assets/js",
  "spaces": 2
});
```

### Run webpack

`webpack`

### Tip: Target old browsers to load the polyfills

```html
<script defer nomodule src="assets/js/polyfills.min.js"></script>
<script defer src="assets/js/app.min.js"></script>
```