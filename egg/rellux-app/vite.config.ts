import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from "path";
const pathSrc = path.resolve(__dirname, 'src')
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      // 如果报错__dirname找不到，需要安装node,执行npm install @types/node --save-dev
      "@": path.resolve(__dirname, 'src'),
      "~@": path.resolve(__dirname, 'src'),
      // "@api": path.resolve(__dirname, "src/api"),
      // "@components": path.resolve(__dirname, "src/components"),
      // "@views": path.resolve(__dirname, "src/views"),
      // "@store": path.resolve(__dirname, "src/store"),
    },
    extensions: ['.ts', '.vue', '.json', '.less']
  },
  server: {
    open: false, // 是否自动在浏览器打开
    cors: true, // 允许跨域 
    port: 8066, // 端口号
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "127.0.0.1", // 后台接口
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        // ws: true, //websocket支持
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  }
})
