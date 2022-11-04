const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "bundle.js", // 生成 名为 bundle.js文件
    path: path.resolve(__dirname, "./dist"), // 绝对路径
    clean: true // 清除dist多余文件
  },

  mode: 'development', // 使webpack编译的模式 变为 开发模式

  devtool: 'inline-source-map', // 方便查看源码 方便调试

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // 以当前index.html为模板
      filename: 'app.html', // 生成名为app.html文件
      inject: 'body', // 将<script>标签注入到body中
    })
  ],

  devServer: {
    static: './dist' // 热更新的效果
  }
};

// npx webpack --watch 实时监测webpack
