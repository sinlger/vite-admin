import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from '@/utils/utils'
const baseURL: any = import.meta.env.VITE_BASE_URL
const request: AxiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    timeout: 1000 * 10,
});
//请求拦截
request.interceptors.request.use(
    (config: any) => {
        if (getToken()) {
            config.headers.Authorization = getToken()
        }
        return config
    }, (error) => {
        console.log('error', error);
        return Promise.reject(error)
    })

// 响应拦截
request.interceptors.response.use((response: AxiosResponse) => {
    //状态码
    return response
}, (error) => {
    if (error.response.status) {
        switch (error.response.status) {
            case 500:
                "服务异常，请重启服务器！"
                break
            case 401:
                "服务异常，请重启服务器！"
                break
            case 403:
                "服务异常，请重启服务器！"
                break
            // 404请求不存在
            case 404:
                "服务异常，请重启服务器！"
                break
            default:
                "服务异常，请重启服务器！"
        }
    }
    return Promise.reject(error)
})

export default request;