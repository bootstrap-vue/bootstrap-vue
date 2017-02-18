const Path = require('path');

// Extend Base Config
const config = module.exports = require('./webpack');

// This is a node.js bundle
config.target = 'node';

config.entry = {
    bootstrapVue: Path.resolve(__dirname, '../index')
};

// Output settings
config.output.filename = 'bootstrap-vue.common.js';
config.output.libraryTarget = 'commonjs2';
