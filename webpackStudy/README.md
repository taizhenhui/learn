# WEBPACK
## webpack 基础

```javascript
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

```

- npx webpack --watch 实时监测webpack
- webpack-dev-server
  > webpack-dev-server 为您提供了一个基本web server ,并且具有live reloading（实时重新加载）功能。

  安装：npm install webpack-dev-server --save-dev
  启动：npx webpack-dev-server
    > npx webpack-dev-server --open 自动打开

- 资源模块
  - asset/resource
    > 导出单独的文件 并生成url
    ```javascript
    module: {
      rules: [{
        test: /\.png$/, // 根据正则 匹配加载文件的类型
        type: 'asset/resource',
        generator: { // 优先级比 output.assetModuleFilename 更高
          filename: 'images/[contenthash][ext]'
        }
      }]
    }
    ```
  - asset/inline
    > 导出一个资源的url (data:image/jpeg;base64,/.......)
    ```javascript
    module: {
      rules: [{
        test: /\.jpg$/,
        type: 'asset/inline',
      }]
    }
    ```
  - asset/source
    > 导出资源的源代码
    ```javascript
    module: {
      rules: [{
        test: /\.txt$/,
        type: 'asset/source',
      }]
    }
    ```
  - asset
    > 通用资源类型 `asset` ，导出一个data URL 和发送一个单独的文件之间自动选择。（默认 `小于8k` 是inline类型，`大于8k` 是source类型）
    通过 *parser.dataUrlCondition.maxSize* 修改临界值大小
    ```javascript
    module: {
      rules: [{
        test: /\.jpg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: { // 当大于maxSize是 选用source 生成一个资源 ,小于时 选用inline 生成Base64文件
            maxSize: 4*1024*1024 
          }
        }
      }]
    }
    ```
- 资源管理
  - 加载`css`
    >为了在JavaScript中`import`一个css文件，你需要安装`style-loader`和`css-loader`，并在`module`中添加这些loader。 

    安装：npm install style-loader css-loader less-loader less --save-dev
    ```javascript
    module: {
      rules: [{
        test: /\.css|less$/,
        use:['style-loader', 'css-loader', 'less-loader'] 
        // 有先后顺序 要先加载 css-loader 再 style-loader （use的加载顺序是从后到前）
      }]
    }
    ```
  - 抽离和压缩`css`
    >在多数情况下，我们也可以进行压缩css，以便生产环境中节省加载时间，同时还可以将css抽离成一个单独文件。实现这个功能，需要 `mini-css-extract-plugin` 这个插件来帮忙。

    安装：npm install mini-css-extract-plugin --save-dev

    *mini-css-extract-plugin*：
      > 1.本插件将css提取到单独文件中，为每个包含css的js文件创建一个css文件，并且支持css和SourceMaps的按需加载 

      > 2.本插件基于webpack v5的新特性构建，并且需要webpack 5才能正常工作
    
    ```javascript
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    //...
    plugins: [
      new MiniCssExtractPlugin({
        filename:'styles/[contenthash].css'
      })

    ],
    //...
    module: {
      rules: [{
        test: /\.css$/,
        use:[MiniCssExtractPlugin, 'css-loader'] 
      }]
    }
    ```
    安装：npm install css-minimizer-webpack-plugin -D
    *css-minimizer-webpack-plugin*
      > 1.本插件用于压缩css文件 

    ```javascript
    const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
    ...
    mode: 'production', 
    ...
    optimization: {
      minimizer:[
        new CssMinimizerWebpackPlugin()
      ]
    }
    ```
  - 加载`images`图像
    > 假如，现在我们正在下载css，但是像background和icon这样的图像呢？在webpack5中，可以使用内置的 `Asset Modules`，我们可以轻松地将这些内容混入我们的系统中，在`css`文件中也可以引用文件，修改`style.css`和入口`index.js`
  - 加载`fonts`字体
    > 使用`Asset Modules` 可以将接收并加载任何文件，然后将其输出到构建目录，这就是说，我们可以将他们用于任何类型的文件，也包括字体，让我们更新 `webpack.config.js` 来处理字体文件 

    ```javascript
    module: {
      rules: [{
        test: /\.(woff|woff2|eot|ttf|otf)$/!,
        type: 'asset/resource'
      }]
    }
    ```
  - 加载数据
    > 如JSON文件，CSV、TSV 和 XML。类似于NodeJS，JSON支持实际上是内置的，也就是 `import Data from './data.json'` 默认将正常运行。要导入CSV、TSV 和 XML，可以使用 `csv-loader` 和 `xml-loader`。

    安装：npm install csv-loader xml-loader -D

    ```javascript
    module: {
      rules: [
        {
          test: /\.(csv|tsv)$/!,
          use: ['csv-loader']
        },
        {
          test: /\.xml$/!,
          use: ['xml-loader']
        }
      ]
    }
    ```

  - 自定义JSON模块 `parser`
    > 通过使用 `自定义 parser` 替代特定的webpack loader，可以将任何 `toml`、`yaml` 或 `json5` 文件作为 JSON 模块导入。

    安装：npm install toml yaml json5 -D

    ```javascript
    const toml = require('toml');
    const yaml = require('yaml');
    const json5 = require('json5');
    ...
    module: {
      rules: [
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
      ]
    }
    ```
- 使用babel-loader

  > 安装：npm install babel-loader @babel/core @babel/preset-env -D
  - `babel-loader`：在webpack里应用babel解析ES6的桥梁
  - `@babel/core`：babel核心模块
  - `@babel/preset-env`：babel预设，一组babel的集合

  *regeneratorRuntime*：
  > 是webpack打包生成的全局辅助函数，由babel生成，用于兼容async/await的语法。
  > 安装：npm install @babel/runtime --save
  > 安装：npm install @babel/plugin-transform-runtime --save-dev

  - `@babel/runtime`：这个包中包含了regeneratorRuntime，运行时需要
  - `@babel/plugin-transform-runtime`：这个插件会在需要regeneratorRuntime的地方自动require导包，编译时需要

  在webpack配置中，是这样 ↓ ↓ ↓
  ```javascript
  module: {
      rules: [
        {
          test: /\.js$/,
          exclude:/node_modules/
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
    }
  ```
- 代码分离
  1. 入口起点：使用entry 配置手动的分离代码。
  ```javascript
  entry: {
    index:"./src/index.js",
    another: './src/another-module.js'
  },
  output: {
    filename: "[name].bundle.js", // 根据不同的入口文件名 生成不同的 bundle.js文件
  },
  ```
  2. 防止重复：使用`Entry dependencies` 或者 `SplitChunksPlugin` 去重和分离代码。
    - 入口依赖 `Entry dependencies` 
      > 配置 `dependOn` option选项，这样可以在多个chunk之间共享模块
      ```javascript
      entry: {
        index: {
          import: "./src/index.js",
          dependOn: "shared"
        },
        another: {
          import: "./src/another-module.js",
          dependOn: "shared"
        },
        shared:'lodash'
      },
      output: {
        filename: "[name].bundle.js", // 根据不同的入口文件名 生成不同的 bundle.js文件
      },
      ```
    - `SplitChunksPlugin` 
      
      ```javascript
      entry: {
        index:'./src/index.js',
        another:'./src/another-module.js'
      },
      optimization: {
        splitChunks: {
          chunks: 'all'
        }
      }
      ```

  3. 动态导入：通过模块的内联函数调用分离代码。
    - 第一种：推荐使用的方式，使用符合 `ECMAScript提案` 的 `import()语法` 来实现动态导入。
      - 懒加载
        > 懒加载或按需加载，是一种很好的优化网页或应用的方式
        ```javascript
        const button = document.createElement('button')
          button.textContent = '点击执行加法运算'
          button.addEventListener('click',()=>{
            import('./math.js').then(({add})=>{
              console.log('add(4,5)',add(4, 5))
            })
          })
          document.body.appendChild(button)
        ```
      - 预获取/预加载 模块
        > webpack v4.60+ 增加了对预获取和预加载的支持。
        在声明 import 时，使用下面这些内置指令，可以让webpack输出 'require hint(资源提示)'，来告知浏览器
         - prefetch（预获取）：将来某些导航下可能需要的资源
            ```javascript
              const button = document.createElement('button')
                button.textContent = '点击执行加法运算'
                button.addEventListener('click',()=>{
                  import(/*webpackChunkName: 'math',webpackPrefetch: true*/'./math.js').then(({add})=>{
                    console.log('add(4,5)',add(4, 5))
                  })
                })
                document.body.appendChild(button)
              ```
         - preload（预加载）：当前导航下可能需要的资源
            ```javascript
            const button = document.createElement('button')
              button.textContent = '点击执行加法运算'
              button.addEventListener('click',()=>{
                import(/*webpackChunkName: 'math', webpackPreload: true*/'./math.js').then(({add})=>{
                  console.log('add(4,5)',add(4, 5))
                })
              })
              document.body.appendChild(button)
            ```
    - 第二种：webpack遗留的功能，使用webpack特定的 `require.ensure` 。
    
      
## webpack 高级