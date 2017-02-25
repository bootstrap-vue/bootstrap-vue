// Extend Base Config
const config = module.exports = require('./webpack');

// This is a node.js bundle
config.target = 'node';

// Output settings
config.output.filename = 'bootstrap-vue.common.js';
config.output.libraryTarget = 'commonjs2';
