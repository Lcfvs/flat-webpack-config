'use strict';

const
webpack = require('webpack'),
Minifier = require('babel-minify-webpack-plugin'),
fs = require('fs'),
readFile = fs.readFileSync,
path = require('path'),
dirname = path.dirname,
resolve = path.resolve,
Banner = webpack.BannerPlugin;

function configure(root) {
  let
  pack = readJSONFile(root, './package.json'),
  config = readJSONFile(root, './flat-webpack-config.json'),
  app = createAppBundle(pack, config, config.bundles.app),
  polyfills = createPolyfillBundle(pack, config, config.bundles.polyfills),
  configs = [];

  configs.push(createConfig(pack, config, app));
  configs.push(createConfig(pack, config, polyfills));

  return configs;
}

function readJSONFile(root, filename) {
  return JSON.parse(readFile(require.resolve(root + '/' + filename)));
}

function createAppBundle(pack, config, dependencies) {
  let
  bundle = {};

  bundle.pack = pack;
  bundle.config = config;
  bundle.name = 'app';
  bundle.banner = addInfo(pack, {});
  bundle.banner.dependencies = {};
  bundle.dependencies = dependencies;
  bundle.paths = [];

  Object.keys(dependencies).forEach(function (name) {
    addPath(bundle, name);
    addBanner(bundle, bundle.banner.dependencies, name);
  });

  bundle.paths.push(resolve(pack.main));

  return bundle;
}

function createPolyfillBundle(pack, config, dependencies) {
  let
  bundle = {};

  bundle.pack = pack;
  bundle.config = config;
  bundle.name = 'polyfills';
  bundle.banner = {};
  bundle.dependencies = dependencies;
  bundle.paths = [];

  Object.keys(dependencies).forEach(function (name) {
    addPath(bundle, name);
    addBanner(bundle, bundle.banner, name);
  });

  return bundle;
}

function addPath(bundle, name) {
  let
  dependency = bundle.dependencies[name];

  bundle.paths.push(require.resolve(dependency.name + '/' + dependency.file));
}

function addBanner(bundle, banner, name) {
  let
  dependency = bundle.dependencies[name];

  banner[name] = addInfo(bundle.pack, {
    name: dependency.name,
    file: dependency.file
  });
}

function getInfo(pack, dependency) {
  if (!dependency.name) {
    return pack;
  }

  return readJSONFile(dependency.name, 'package.json');
}

function addInfo(pack, dependency) {
  let
  info = getInfo(pack, dependency);

  dependency.version = info.version;
  dependency.author = info.author && info.author.name || info.author;
  dependency.license = info.license;
  dependency.homepage = info.homepage;

  return dependency;
}

function createConfig(pack, config, bundle) {
  return {
    target: 'web',
    devtool: config.map ? 'source-map' : undefined,
    entry: bundle.paths,
    output: {
      path: resolve(config.output),
      filename: bundle.name.concat('.min.js')
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: resolve(dirname(pack.main)),
          options: {
            presets: ['env']
          }
        }
      ]
    },
    plugins: [
      new Minifier({}, {
        test: /\.js$/
      }),
      new Banner({
        banner: JSON.stringify(bundle.banner, null, config.spaces).replace(/"/g, ''),
        test: /\.js$/
      })
    ]
  }
}

module.exports = configure;