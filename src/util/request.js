import axios from 'axios'
import qs from 'qs'


// axios.defaults.baseURL = 'http://127.0.0.1:9527/'

/**
 * 自定义实例默认值
 */
const instance = axios.create({
    timeout: 15000, // 请求超时时间
    withCredentials: true
  })

/**
 * 添加请求拦截器 ，意思就是发起请求接口之前做什么事，一般都会发起加载一个loading
 */
 instance.interceptors.request.use(
    config => {
    const token = store.state.user.tokenInfo.token

    if (token) {
      config.headers.token = token
    }
    //添加时间戳，防止页面缓存
        if (config.method == 'post') {
          config.data = {
            ...config.data,
            _t: Date.parse(new Date()) / 1000
          }
        } else if (config.method == 'get') {
          config.params = {
            _t: Date.parse(new Date()) / 1000,
            ...config.params
          }
        }
        return config
      },
      error => {
        // 对请求错误做些什么，处理这个错误
        // 可以直接处理或者展示出去,toast show()
        console.warn(error)
        return Promise.reject(error)
      }
    )
/**
 * 添加响应拦截器
 */
 instance.interceptors.response.use(
    response => {
      let res = response.data
      return res
    },
    error => {
      return Promise.reject(error)
    }
  )
/**
 * 使用es6中的类，进行简单封装
 */
 class ajaxhttp {
    // 使用async ... await
    static async get (url, params) {
      // eslint-disable-next-line no-return-await
      return await instance.get(url, {
        params: params
      })
    }
    static async post (url, params) {
      // eslint-disable-next-line no-return-await
      return await instance.post(url, qs.stringify(params))
    }
    static async fliePost (url, params) {
      // eslint-disable-next-line no-return-await
      return await instance.post(url, params)
    }
  }


export default ajaxhttp
