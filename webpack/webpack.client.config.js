var path = require('path');

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
      }
    ]
  },
  target: 'web',
};
