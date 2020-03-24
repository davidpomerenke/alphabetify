const path = require('path')

module.exports = {
  entry: ['./docs/webpack-entry.js'],
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs')
  }
}
