/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1669705551730_4649';

  // add your middleware config here
  config.middleware = [];
  /**
   * 配置swagger
   * @property {String} dirScanner - 插件扫描的文档路径
   * @property {String} basePath - api前置路由
   * @property {Object} apiInfo - 可参考Swagger文档中的Info
   * @property {Array[String]} apiInfo - 可参考Swagger文档中的Info
   * @property {Array[String]} schemes - 访问地址协议http或者https
   * @property {Array[String]} consumes - contentType的集合
   * @property {Array[String]} produces - contentType的集合
   * @property {Object} securityDefinitions - 安全验证，具体参考swagger官方文档
   * @property {Boolean} enableSecurity - 是否使用安全验证
   * @property {Boolean} routeMap - 是否自动生成route
   * @property {Boolean} enable - swagger-ui是否可以访问
   */
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'egg-swagger文档',
      description: 'swagger-ui for egg',
      version: '1.0.0',
    },
    consumes: ['application/json', 'multipart/form-data'], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html
    produces: ['application/json', 'multipart/form-data'], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回
    schemes: ['http', 'https'],
    routerMap: true,
    enable: true,
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  userConfig.security = {
    csrf: false,
    domainWhiteList: ['http://localhost:8000'],
  }
  userConfig.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'admin123',
      database: 'cms'
    }
  }
  return {
    ...config,
    ...userConfig,
  };
};
