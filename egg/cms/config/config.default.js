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

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  userConfig.security = {
    csrf: false
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
