const path = require('path');

module.exports = {
  entry: rp('./src/app.js'),
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'es2015'],
        },
      },
    ],
  },
};

function rp(filePath = '') {
  return path.resolve(__dirname, filePath);
}
