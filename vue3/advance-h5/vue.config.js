const { defineConfig } = require("@vue/cli-service");
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  devServer: {
    // 设置为0.0.0.0则所有的地址均能访问 
    host: "0.0.0.0",
    port: 8066,
    // 跨域
    proxy: {
    // 只要axios请求中带有/api的url,就会触发代理机制
    '/api': {
       // 目标路径：target(我们要代理请求的地址)
       target: 'https://test.rellux.cn',
      //  target: 'http://192.168.10.80:10670',
       // 允许跨域
       changOrigin: true,
       // 重写路径 api代替了目标路径
       pathRewrite: {
         '^/api': ''
       }
      }
    },
  },
});
