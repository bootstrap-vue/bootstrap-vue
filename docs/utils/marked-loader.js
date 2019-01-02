// Based on https://github.com/peerigon/markdown-loader/

const marked = require("marked");
const loaderUtils = require("loader-utils");

module.exports = function (markdown) {
  // merge params and default config
  const options = loaderUtils.getOptions(this);

  this.cacheable();

  marked.setOptions(options);

  return marked(markdown);
};
