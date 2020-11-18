const path = require('path')

const resolve = dir => path.join(__dirname, dir)
module.exports = {
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