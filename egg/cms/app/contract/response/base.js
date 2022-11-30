'use strict';

module.exports = {
  // 测试模块
  baseResponse: {
    code: {type:'number'},
    message: { type: 'string' }
  },
  postUserParams: {
    username: { type: 'string', required: true, description: '账户名' },
    password: { type: 'string', required: true, description: '密码' },
    email: { type: 'string', required: false, description: '邮箱' },
    gender: { type: 'number', required: false, description: '性别' },
    phone: { type: 'string', required: false, format: /^1[34578]\d{9}$/, description: '电话' },
  },
};