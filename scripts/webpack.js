// ===============================================================
// A PART OF BOOTSTRAP-VUE - Pooya Parsa <pooya@pi0.ir>
// https://github.com/pi0/bootstrap-vue
// ===============================================================

const Webpack = require('webpack');
const path = require('path');


var config = module.exports = {
  plugins: [],
};

// Set context to root of project
config.context = path.resolve(__dirname, '..');

// Resolver config
config.resolve = {
  extensions: ['.js', '.vue'],
  // If false it will also try to use no extension from above
  enforceExtension: false,
};

config.resolveLoader = {
  modules: config.resolve.modules,
};

// Client entry
config.entry = {
  bootstrapVue: path.resolve(__dirname, '../components'),
};

// Basic output config
config.output = {
  path: path.resolve(__dirname, '../dist'),
  filename: '[name].js',
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
      loader: 'vue-style!css',
    }
    ,
    // SCSS
    {
      test: /\.scss$/,
      loader: 'vue-style!sass'
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



if (process.env.NODE_ENV !== 'production') { // Development Config

  config.devtool = '#eval';

} else { // Production Config


  config.devtool = '#source-map';

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
  config.plugins.push(new Webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      sourceMap: true,
  }));

}
