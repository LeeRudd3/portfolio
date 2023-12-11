const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'App.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    compress: true,
    inline: true,
    port: '8080',
    allowedHosts: [
      '.onrender.com'
    ]
  }
}