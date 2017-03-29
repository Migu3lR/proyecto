var path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './source/client.jsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../built/statics'),
  },
  module: {
    loaders: [
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
            },
          }
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?modules' })
      }
    ]
  },
  target: 'web',
  plugins: [
    new ExtractTextPlugin({ filename: '../statics/styles.css' }),
  ]
};
