## 创建项目流程

### 初始化项目

```js
npm init vite@latest
```



### 安装Less

安装less 和 less-loader

```js
yarn add less less-loader -D
```



### 安装element-plus

```js
yarn add element-plus
```

**自动导入**

需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```



### 安装router

```js
yarn add vue-router
```



### 安装axios

```js
yarn add axios
```



## 项目中的报错

#### [plugin:vite:css] [less] '~@/styles/var.less' wasn't found. 

> 找不到路径

**解决：**

```js
// vite.config.ts
resolve: {
    alias: {
      // 如果报错__dirname找不到，需要安装node,执行yarn add @types/node -D
      "@": path.resolve(__dirname, 'src'),
      "~@": path.resolve(__dirname, 'src')
    }
},
```



#### 找不到模块“@vitejs/plugin-vue”或其相应的类型声明。ts(2307)

找不到模块“@vitejs/plugin-vue”或其相应的类型声明。ts(2307)

找不到模块“vite”或其相应的类型声明。

![image-20230421153207390](C:\Users\JS04\AppData\Roaming\Typora\typora-user-images\image-20230421153207390.png)

**解决：**

```json
"compilerOptions": {
   	// ...
    "moduleResolution": "node",
},
```



#### 路由配置*号报错

> caught Error: Catch all routes ("*") must now be defined using a param with a custom regexp.

```js
 {
    path: "/:catchAll(.*)",
    name: "404",
    component: NotFound
  },

```



#### 'xxx' is declared but its value is never read.ts(6133)

```js
变量前加 _ : from --> _from
```

