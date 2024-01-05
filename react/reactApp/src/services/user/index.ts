// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 登录接口 POST /api/login/account */
export async function login(body: USERAPI.LoginParams) {
    return request<USERAPI.LoginResult>('/api/login', {
      method: 'POST',
      data: body,
    });
  }