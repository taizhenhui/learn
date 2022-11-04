const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const toml = require('toml');
const yaml = require('yaml');
const json5 = require('json5')

module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "bundle.js", // 生成 名为 bundle.js文件
    path: path.resolve(__dirname, "./dist"), // 绝对路径
    clean: true, // 清除dist多余文件
    assetModuleFilename: 'images/[contenthash][ext]', // [contenthash] 生成以文件名 为内容的 hash文件名； [ext]为扩展名
  },

  mode: 'development', 
  // development 使webpack编译的模式 变为 开发模式 
  // production  使webpack编译的模式 变为 生产模式

  devtool: 'inline-source-map', // 方便查看源码 方便调试

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // 以当前index.html为模板
      filename: 'app.html', // 生成名为app.html文件
      inject: 'body', // 将<script>标签注入到body中
    }),
    new MiniCssExtractPlugin({
      filename:'styles/[contenthash].css'
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
      },

      {
        test: /\.css|less$/,
        use:[MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] // 有先后顺序 要先加载 css-loader 再 style-loader （use的加载顺序是从后到前）
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, 
        type: 'asset/resource',
      },

      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader']
      },

      {
        test: /\.xml$/,
        use: ['xml-loader']
      },

      {
        test: /\.toml$/,
        type: 'json',
        parser: {
          parse: toml.parse
        }
      },
      
      {
        test: /\.yaml$/,
        type: 'json',
        parser: {
          parse: yaml.parse
        }
      },

      {
        test: /\.json5$/,
        type: 'json',
        parser: {
          parse: json5.parse
        }
      },
      {
        test: /\.js$/,
        exclude:/node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime'
              ]
            ]
          }
        }
      },
    ]
  },

  optimization: {
    minimizer:[
      new CssMinimizerWebpackPlugin()
    ]
  }
};

// npx webpack --watch 实时监测webpack
