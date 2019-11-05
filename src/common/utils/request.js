/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message } from 'antd';
import router from 'umi/router';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '您请求的资源不存在',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
message.config({
  top: '40%',
  maxCount: 1,
  duration: 2
});
const errorHandler = function (err) {
  const { response } = err;
  window.g_app._store.dispatch({
    type: 'global/loadingHide'
  });
  if (response) {
    if (response.status === 401) {
      if(err.data && err.data.code==1006){
        message.error(err.data.message);
        throw err;
      }
      window.localStorage.removeItem("token");
      router.push('/login');
      throw err;
    } else if (err.data) {
      message.error(err.data.message != 'No message available' ? err.data.message : codeMessage[response.status]);
    } else if (!err.data) {
      message.error(codeMessage[response.status]);
    }
  } else {
    message.error('您的网络发生异常，请求失败');
  }
  throw err;
}

const request = extend({
  prefix: BASE_API,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  credentials: 'include',
  errorHandler
});
request.interceptors.response.use((response) => {
  window.g_app._store.dispatch({
    type: 'global/loadingHide'
  });
  return response;
});
request.interceptors.request.use((url, options) => {
  window.g_app._store.dispatch({
    type: 'global/loadingShow'
  });
  const token = window.localStorage.token;
  options.headers = {
    'Auth-Token': token,
  };
  return (
    {
      url: url,
      options: options,
    }
  );
});

export default request;
