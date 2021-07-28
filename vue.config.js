const EncodingPlugin = require('webpack-encoding-plugin');  //encoding

module.exports = {
  publicPath: './',
  outputDir: 'browser',
  assetsDir: 'assets',
  //--->关闭HASH命名
  filenameHashing:false,
  //--->关闭eslint语法检查
  lintOnSave: false,
  //--->webpack配置
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      return {
        plugins: [
          // ---转变编码方式
          new EncodingPlugin({
            encoding: 'GB18030'
          }),
        ]
      }
    } else {
      // 为开发环境修改配置...
    }
  }
}