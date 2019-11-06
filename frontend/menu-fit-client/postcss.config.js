module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 30,
      minPixelValue: 3,
      propWhiteList: []
    })
  ]
}