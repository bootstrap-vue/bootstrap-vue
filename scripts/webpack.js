// ===============================================================
// A PART OF BOOTSTRAP-VUE - Pooya Parsa <pooya@pi0.ir>
// https://github.com/pi0/bootstrap-vue
// ===============================================================

const Webpack = require('webpack');
const Path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
require('./fix')

var config = module.exports = {
  plugins: [],
};

// Set context to root of project
config.context = Path.resolve(__dirname, '..');

// Resolver config
config.resolve = {
  extensions: ['', '.js', '.vue'],
  alias: {},
};

config.resolveLoader = {
  modules: config.resolve.modules,
};

// Client entry
config.entry = Path.resolve(__dirname, '../components');

// Basic output config
config.output = {
  path: Path.resolve(__dirname, '../dist'),
  filename: 'bootstrap-vue.min.js',
};

// Config Module Loaders
config.module = {

  loaders: [
    // Vue
    {
      test: /\.vue$/,
      loader: 'vue',
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
      loader: ExtractTextPlugin.extract({loader: 'postcss!css'}),
    }
    ,
    // SCSS
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({loader: 'postcss!css!sass'}),
    },
    // SCSS
    {
      test: /\.sass$/,
      loader: ExtractTextPlugin.extract({loader: 'postcss!css!sass'}),
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
        'scss': ExtractTextPlugin.extract({
          loader: 'vue-style!css!sass',
        }),
      }
    }
  }
}));


if (process.env.NODE_ENV !== 'production') { // Development Config
  // Enable watch
  config.watch = true;
  config.watchOptions = {
    aggregateTimeout: 3000,
    poll: 2000,
    watchDelay: 2000,
  };
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

  // Extract CSS
  config.plugins.push(new ExtractTextPlugin({
    filename: Path.resolve(__dirname, '../dist/styles.css'),
    allChunks: true,
    disable:true,
  }));


}




