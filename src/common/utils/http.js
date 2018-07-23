import axios from 'axios';
import cookie from 'react-cookies';
import { Feedback } from '@icedesign/base';
import store from '@redux';
import * as loadingActions from '@redux/actions/loadingActions'

const httpUtil = axios.create({
    baseURL: serverUrl,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
})
// 请求拦截
httpUtil.interceptors.request.use(function (config) {
    store.dispatch(loadingActions.show());
    const token = cookie.load('token');
    config.headers = {
        'Authorization': token,
    };
    return config;
}, function (error) {
    store.dispatch(loadingActions.hide());
    // 请求失败的处理
    Feedback.toast.error('请求失败！');
    return Promise.reject(error);
});

// 响应拦截
httpUtil.interceptors.response.use(function (response) {
    // 处理响应数据
    store.dispatch(loadingActions.hide());
    return response;
}, function (error) {
    store.dispatch(loadingActions.hide());
    if (error.response.status === 401) {
        location.replace("#/login");
        return Promise.reject(error);
    }
    if (error.response && error.response.data) {
        Feedback.toast.error(error.response.data.message);
    } else if (error.response && !error.reponse.data) {
        Feedback.toast.error(error.message);
    } else {
        Feedback.toast.error(error.message);
    }
    return Promise.reject(error);
});

export default httpUtil;
