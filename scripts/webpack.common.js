const Webpack = require('webpack');
const Path = require('path');

// Extend Base Config
var config = module.exports = require('./webpack');

// This is a node.js bundle
config.target = 'node';

config.entry={
  bootstrapVue: Path.resolve(__dirname, '../components'),
};

// Output settings
config.output.filename = '[name].common.js';
config.output.libraryTarget = 'commonjs2';
