# rellux-advance

## 下载依赖

```sh
npm install
```



## 启动项目

> 编译和热重新加载以进行开发

```sh
npm run serve
```



## 项目打包

> 用于生产的类型检查、编译和最小化

```sh
npm run build
```



## **项目语法校验**

```sh
npm run lint
```



##  目录规范

```json
project tree

├── node_modules // 依赖文件
├── public // 公共文件
│   ├── index.html // 项目打包时会以该文件为母板
│   └── favicon.ico // 项目ico图标
│
├── src // 资源文件夹
│   ├── api // api接口管理
│   ├── assets // 资源文件夹，存放图片之类的资源
│   ├── components // 公共组件文件夹
│   ├── mock // 模拟接口数据
│   ├── router // 路由文件夹，决定了页面的跳转规则
│   ├── stores // pinia状态管理文件
│   ├── styles // 公共样式
│   ├── types // ts类型声明 接口 枚举 类型别名
│   ├── utils // 工具类
│   ├── views // 页面文件夹
│   ├── App.vue // 应用组件，组件都是在这个组件之上运行
│   ├── main.ts // 入口文件  
│   └── shims-vue.d.ts // 为了 typescript 做的适配定义文件
│
├── .browserslistrc // 浏览器兼容
├── .eslintrc.js // 代码检测
├── .gitignore // 配置不上传到git仓库的文件
├── babel.config.js // 代码编译
├── components.d.ts // 按需引入的组件
├── package-lock.json // 锁定安装时的包的版本号
├── package.json // 项目描述文件
├── tsconfig.json // ts配置文件
└── vue.config.js // vue配置文件

```



##  views 下面的目录

```
LessonDetail: 课程详情
LessonOrderDetail: 课程订单详情
LessonSubscribe: 课程预定
OrderList: 订单列表
StoreList: 门店列表
SubscribeInstructions: 预约须知
```



##  components 下面的组件







## 项目技术

### 前端技术

- 框架：`Vue` 全家桶
  - `Vue` -- 3.2.13 
  - `VueRouter` -- 4.0.3
  - `Pinia` -- 2.0.33
  - `Axios` -- 1.3.4
- 语言：`Typescript` -- 4.5.5
- 组件库：`Vant` -- 4.1.2
- 预处理语言：`Less` -- 4.0.0
- 数据：`Mockjs` -- 1.1.0
- 其他第三方库



### 后端

java
