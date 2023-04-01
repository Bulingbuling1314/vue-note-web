import axios, { AxiosInstance } from 'axios';
import { showMessage } from './status'
import { GET_TOKEN } from '@/utils';
import { default as pinia, useUserStore } from "@/store";
import { Message } from 'view-ui-plus'
class AxiosUtils {
    service: AxiosInstance

    constructor() {
        this.service = axios.create({
            baseURL: import.meta.env.VITE_BASE_URL + '/bb', // url = base url + request url
            timeout: 10000,
            withCredentials: true, // send cookies when cross-domain requests
            headers: {
                // clear cors
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            }
        })
        this.addInterceptors()
    }
    addInterceptors() {
        // axios实例拦截请求
        this.service.interceptors.request.use(
            config => {
                // 在此处添加请求头等，如添加 token
                config.headers.Authorization = GET_TOKEN() || ""
                return config;
            },
            error => {
                Promise.reject(error);
            }
        )

        this.service.interceptors.response.use(
            response => {
                if (response.data.code === 200) {
                    return response.data
                } else if (response.data.code === 401) {
                    const store = useUserStore(pinia)
                    Message.warning(showMessage(response.data.code));
                    return store.logout()
                } else {
                    Message.warning(response.data.msg);
                    return response.data
                }
            },
            error => {
                return Promise.reject(error)
            }
        )
    }
}

const service = new AxiosUtils().service

export default service