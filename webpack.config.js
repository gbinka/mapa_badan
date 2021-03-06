module.exports = {
  module: {
    mode: 'development',
    rules: [
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
  // plugin omitted
}
