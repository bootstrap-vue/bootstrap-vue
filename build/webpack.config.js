const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const Webpack = require('webpack');

module.exports = function (env) {
    const config = {
        plugins: []
    };

    // Set context to root of project
    config.context = path.resolve('..', __dirname);

    // Resolver config
    config.resolve = {
        extensions: ['.js', '.vue'],
        enforceExtension: false
    };

    config.resolveLoader = {
        modules: config.resolve.modules
    };

    // Target
    config.target = env.target;

    // External dependencies
    config.externals = [
        'vue-style-loader',
        'vue',
        'tether'
    ];

    // Library entry
    config.entry = {
        'bootstrap-vue': path.resolve(__dirname, '../index')
    };

    // Basic output config
    const dot = val => val ? ('.' + val) : '';
    config.output = {
        path: path.resolve(__dirname, '../dist'),
        filename: `[name]${dot(env.target)}${dot(env.libraryTarget)}.js`
    };

    // Config Module Loaders
    config.module = {
        loaders: [
            // Vue
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // JS
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    };

    if (env === 'production' || env.production || process.env === 'production') {
        // Production Config
        config.devtool = '#source-map';

        // Pass build environment inside bundle
        // This will Strip comments in Vue code & hort-circuits all Vue.js warning code
        config.plugins.push(new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }));

        // The UglifyJsPlugin will no longer put loaders into minimize mode, and the debug option has been deprecated.
        config.plugins.push(new Webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }));

        // Minify with dead-code elimination
        config.plugins.push(new Webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            sourceMap: true
        }));
    } else {
        // Development Config
        config.devtool = '#eval-source-map';
    }

    return config;
};
