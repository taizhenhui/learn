import axios from 'axios'
import showMessage from "../utils/showMessage";
const instance = axios.create(); // 创建一个 axios 实例

instance.interceptors.request.use(function (config) {
  console.log(config,'config');
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  if (response.data.code !== 0) {
    showMessage({
      content: response.data.msg,
      type: 'error',
      duration: 1500
    })
    return response.data.data = null
  }
  return response.data.data;
}, function (error) {
  return Promise.reject(error);
});

export default instance;
