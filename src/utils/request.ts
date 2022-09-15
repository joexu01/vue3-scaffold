import axios, {AxiosRequestConfig, AxiosResponse, AxiosPromise} from 'axios'
import config from '../config'
import router from "../router";
import {ElMessage} from "element-plus";
import {getToken} from "@/utils/auth";

const TOKEN_INVALID = '令牌过期，请重新登录'
const NAVIGATION_FAILED = '跳转失败'
const NETWORK_ERROR = '网络异常'

// 创建 axios 实例对象，添加全局配置
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 8000
})

// 请求拦截
service.interceptors.request.use((request) => {
    let token = getToken();
    const headers = request.headers
    if (headers?.Authorization) {
        headers.Authorization = 'Bearer ' + token;
    }
    console.log(headers)
    return request;
})

// 响应拦截
service.interceptors.response.use((resp) => {
    const {errno, err_msg} = resp.data;
    console.log("errno: ", errno)
    if (errno === 0) {
        return resp
    } else if (errno === 40001) {
        ElMessage.error(TOKEN_INVALID)
        setTimeout(() => {
            router.push('/login')
                .then((reason) => {
                    ElMessage(NAVIGATION_FAILED + reason?.message)
                })
        }, 15000)
        return Promise.reject(TOKEN_INVALID)
    } else {
        ElMessage.error(err_msg || NETWORK_ERROR)
        return Promise.reject((err_msg || NETWORK_ERROR))
    }
})

export interface RequestOptions<D = any> extends AxiosRequestConfig {
    mock: boolean;
}

/**
 * 请求核心函数
 * @param {*} options 请求配置
 * @returns {AxiosPromise}
 * 调用时统一传 data 再根据请求方法判断是不是该转成 params
 */
function request<T = any, R = AxiosResponse<T>, D = any>(options: RequestOptions<D>) {
    options.method = options.method || 'get';
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data;
    }
    if (typeof options.mock != 'undefined') {
        config.mock = options.mock;
    }

    if (config.env === 'production') {
        service.defaults.baseURL = config.baseApi;
    } else {
        service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi;
    }

    return service(options)
}

export default request
