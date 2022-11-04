const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "bundle.js", // 生成 名为 bundle.js文件
    path: path.resolve(__dirname, "./dist"), // 绝对路径
    clean: true, // 清除dist多余文件
    assetModuleFilename: 'images/[contenthash][ext]', // [contenthash] 生成以文件名 为内容的 hash文件名； [ext]为扩展名
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
  },

  module: {
    rules: [
      {
        test: /\.png$/, // 根据正则 匹配加载文件的类型
        type: 'asset/resource',
        generator: { // 优先级比 output.assetModuleFilename 更高
          filename: 'images/[contenthash][ext]'
        }
      },

      // {
      //   test: /\.jpg$/,
      //   type: 'asset/inline',
      // },

      {
        test: /\.txt$/,
        type: 'asset/source',
      },

      {
        test: /\.jpg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: { // 当大于maxSize是 选用source 生成一个资源 ,小于时 选用inline 生成Base64文件
            maxSize: 4*1024*1024 
          }
        }
      }
    ]
  }
};

// npx webpack --watch 实时监测webpack
