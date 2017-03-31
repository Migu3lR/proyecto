const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './source/client.jsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../built/statics'),
    publicPath: process.env.NODE_ENV === 'production' ? 'https://platzi-react-sfs.now.sh' : 'http://138.68.131.182:3002',
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        use: 'eslint-loader',
        enforce: 'pre',
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2016', 'es2017', 'react'],
              plugins: ['babel-plugin-transform-es2015-modules-commonjs'],
              env: {
                production: {
                  plugins: ['transform-regenerator', 'transform-runtime'],
                  presets: ['es2015'],
                },
                development: {
                  plugins: ['transform-es2015-modules-commonjs'],
                },
              },
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?modules' }),
      },
    ],
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new ExtractTextPlugin({ filename: '../statics/styles.css' }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require'],
      },
    }),
  );
}

module.exports = config;
