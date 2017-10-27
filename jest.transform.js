const fs = require('fs');
const babelConfig = JSON.parse(fs.readFileSync('./tests/.babelrc', 'utf8'));

const babelJest1 = require('babel-jest');

module.exports = babelJest1.createTransformer(babelConfig);
