const Webpack = require('webpack');
const Path = require('path');

var config = module.exports = {
  plugins: [],
};

// Resolver config
config.resolve = {
  extensions: ['.js', '.vue'],
  alias: {},
};

// Client entry
config.entry = './index.js';

// Basic output config
config.output = {
  path: 'dist',
  filename: 'bootstrap-vue.js',
};

// Config Module Loaders
config.module = {

  loaders: [
    // Vue
    {
      test: /\.vue$/,
      loader: 'vue'
    },
    // Vue HTML
    {
      test: /\.html$/,
      loader: 'vue-html'
    },
    // JS
    {
      test: /\.js$/,
      loader: 'babel',
      // important: exclude files in node_modules, otherwise it's going to be really slow!
      exclude: /node_modules|vendor/
    },
    // JSON
    {
      test: /\.json$/,
      loader: 'json'
    },
    // CSS
    {
      test: /\.css$/,
      loader: 'postcss!css',
    },
    // SCSS
    {
      test: /\.scss$/,
      loader: 'postcss!sass'
    },
    // Font
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file'
    },
    // Media
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url',
      query: {
        // limit for base64 inlining in bytes
        limit: 10000,
        // custom naming format if file is larger than the threshold
        name: '[name].[ext]?[hash]'
      }
    },
    // Node
    {
      test: /\.node$/,
      loader: "node-loader"
    },
  ]
};

// Config Vue style loader
config.plugins.push(new Webpack.LoaderOptionsPlugin({
  options: {
    vue: {
      loaders: {
        'scss': 'vue-style!css!sass', // This will match all <style lang=scss> tags
      }
    }
  }
}));


if (process.env.NODE_ENV === 'production') { // Development Config

  // Enable watch
  config.watch = true;
  config.watchOptions = {
    aggregateTimeout: 3000,
    poll: 2000,
    watchDelay: 2000,
  };

  // Eval source maps are so fast and also available inside bundles :)
  config.devtool = '#eval';

} else { // Production Config

  // Pass build environment inside bundle
  // This will Strip comments in Vue code & hort-circuits all Vue.js warning code
  config.plugins.push(new Webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  }));

  // The UglifyJsPlugin will no longer put loaders into minimize mode, and the debug option has been deprecated.
  config.plugins.push(new Webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }));


  // Minify with dead-code elimination
  config.plugins.push(new Webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));

}


