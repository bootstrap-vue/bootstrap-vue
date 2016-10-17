// Workaround for ExtractTextPlugin Bug
const Chunk = require('../node_modules/webpack/lib/Chunk');

Chunk.prototype.isInitial = function () {
  return this.entrypoints && this.entrypoints.length > 0;
};

Chunk.prototype = Object.create(Chunk.prototype, {
  initial: {
    configurable: false,
    get: function () {
      return this.isInitial();
    },
    set: function () {
    }
  }
});
