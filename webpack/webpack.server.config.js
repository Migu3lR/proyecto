var path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './source/server.jsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../built/server'),
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
              presets: ['latest-minimal', 'react']
            },
          }
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.css?$/,
        use: [
          {
            loader: ExtractTextPlugin.extract({ fallback: 'style', use: 'css?modules' })
          }
        ]
      }
    ]
  },
  target: 'node',
  plugins: [
    new ExtractTextPlugin('../statics/styles.css'),
  ]
};
