import { useLayoutStore } from '/@/store/modules/layout'
import axios from 'axios'
import { AxiosResponse } from 'axios'
import { ElLoading, ElNotification } from 'element-plus'

let loading:{close():void}
// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    baseURL: import.meta.env.VUE_APP_API_BASE_URL as string | undefined,
    timeout: 5000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error:{message:string}) => {
    loading.close()
    console.log(`err${error}`)
    ElNotification({
        title: '请求失败',
        message: error.message,
        type: 'error'
    })
    return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
    const { getStatus } = useLayoutStore()
    loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.4)'
    })
    const token = getStatus.ACCESS_TOKEN
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) {
        config.headers['Access-Token'] = token
    }
    return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response:AxiosResponse<IResponse>) => {
    const { data } = response
    const { getStatus, logout } = useLayoutStore()
    loading.close()
    if(data.code !== "0") {
        let title = '请求失败'
        if(data.code === "401") {
            if (getStatus.ACCESS_TOKEN) {
                logout()
            }
            title = '身份认证失败'
        }
        ElNotification({
            title,
            message: data.msg,
            type: 'error'
        })
        return Promise.reject(new Error(data.msg || 'Error'))
    }
    return response.data.data
}, errorHandler)

export default request