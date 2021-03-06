import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { showMessage } from './status'
import { message } from 'ant-design-vue';
import { GET_TOKEN } from '@/utils/localStorage';
import router from '@/router';
import store from '@/store';

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL, // url = base url + request url
    timeout: 10000,
    withCredentials: true, // send cookies when cross-domain requests
    headers: {
        // clear cors
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
    },
})

// axios实例拦截请求
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 在此处添加请求头等，如添加 token
        config.headers = {
            Authorization: GET_TOKEN() || ""
        }
        return config;
    },
    (error: any) => {
        Promise.reject(error);
    }
)
// axios实例拦截响应
service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            if (response.data.code === 200) {
                return Promise.resolve(response.data);
            } else if (response.data.code === 401) {
                message.warning(showMessage(response.data.code));
                return store.dispatch('Logout')
            } else {
                message.warning(response.data.msg);
                return Promise.reject(response.data);
            }
        } else {
            message.warning(showMessage(response.status));
            Promise.reject(response);
        }
    },
    // 请求失败
    (error: any) => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            message.warning(showMessage(response.status));
            return Promise.reject(response.data);
        } else {
            message.warning('网络连接异常,请稍后再试!');
        }
    }
);

export default service