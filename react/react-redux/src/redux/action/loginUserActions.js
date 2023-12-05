export const SET_LOGIN_USER_TYPE = Symbol('set-login-user');

/**
 * 设置登录用户的action
 * @param {*} user 
 * @returns 
 */
export function createSetLoginUserAction(user) {
    return {
        type: SET_LOGIN_USER_TYPE,
        payload: user
    }
}