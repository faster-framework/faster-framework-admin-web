import axios from 'axios';
import cookie from 'react-cookies';
import { Feedback } from '@icedesign/base';

const httpUtil = axios.create({
    baseURL: 'http://192.168.2.181:8080/',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
})
// 请求拦截
httpUtil.interceptors.request.use(function (config) {
    const token = cookie.load('token');
    config.headers = {
        'Authorization': token,
    };
    return config;
}, function (error) {
    // 请求失败的处理
    Feedback.toast.error('请求失败！');
    return Promise.reject(error);
});

// 响应拦截
httpUtil.interceptors.response.use(function (response) {
    // 处理响应数据
    return response;
}, function (error) {
    if (error.response && error.response.data) {
        Feedback.toast.error(error.response.data.message);
    } else if (error.response && !error.reponse.data) {
        Feedback.toast.error('服务器端异常！');
    } else {
        console.info(error);
    }
    return Promise.reject(error);
});

export default httpUtil;
