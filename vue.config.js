const path = require('path')

const resolve = dir => path.join(__dirname, dir)
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  outputDir: 'docs',
  productionSourceMap: process.env.NODE_ENV === "production" ? false : true,
  transpileDependencies: [
    "vuetify"
  ],
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('img', resolve('src/assets/img'))
      .set('comp', resolve('src/components'))
      .set('view', resolve('src/views'))
  }
}