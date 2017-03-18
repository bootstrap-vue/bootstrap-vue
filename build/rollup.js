const path = require('path');
const {rollup} = require('rollup');
const config = require('./rollup.config');

const base = path.resolve(__dirname, '..');
const dist = path.resolve(base, 'dist');

rollup(config).then(bundle => {
    bundle.write({
        format: 'cjs',
        dest: path.resolve(dist, config.moduleName + '.common.js'),
        sourceMap: true
    }).catch(console.error);

    bundle.write({
        format: 'es',
        dest: path.resolve(dist, config.moduleName + '.esm.js'),
        sourceMap: true
    }).catch(console.error);

    bundle.write({
        format: 'umd',
        moduleName: config.moduleName,
        dest: path.resolve(dist, config.moduleName + '.js'),
        sourceMap: true
    }).catch(console.error);
}).catch(console.error);
