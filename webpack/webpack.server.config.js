var path = require('path');

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
      }
    ]
  },
  target: 'node',
};
