exports.keys = 'rellux-system'

// 安全配置
exports.security = {
  csrf: {
    enable: false,
  },
};

exports.middleware = []

exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: '58.34.167.4',
    // 端口号
    port: '33306',
    // 用户名
    user: 'root',
    // 密码
    password: 'zVtYm39TUZlWDhCp',
    // 数据库名
    database: 'rellux_system',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};

exports.jwt = {
  secret: 'rellux-secret5244',
  // enable: true, // 默认是关闭，如果开启，这会对所有请求进行自动校验；限定请求，请设置match做路径匹配
  // match: /^\/api/, // 匹配的请求，会走jwt校验，否则忽略；例如登录接口需要被忽略；
  // sign: {	//jwt.sign(***,***,[options,***])方法中，options的默认设置可以在这里配置；
  //   expiresIn: 10   //多少s后过期。actionToken.js中,jwt.sing(plyload,secret,{expiresIn:number})会被合并，调用时设置优先级更高;
  // }
}

exports.bodyParser= {
  jsonLimit: '1mb',
  formLimit: '1mb',
}