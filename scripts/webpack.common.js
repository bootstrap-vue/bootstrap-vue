const Webpack = require('webpack');
const Path = require('path');

// Extend Base Config
var config = module.exports = require('./webpack');

// This is a node.js bundle
config.target = 'node';

// Output settings
config.output.filename = 'bootstrap-vue.js';
config.output.libraryTarget = 'commonjs2';
