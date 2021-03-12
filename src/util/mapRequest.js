import axios from 'axios'
import qs from 'qs'
import store from '../store'

// const baseURI = '/mapApi'
// axios.defaults.baseURL = 'http://127.0.0.1:9527/'
// https://restapi.amap.com/v3/ip?key=4ce136b9d07cd583aaa787e820f12d50
/**
 * 自定义实例默认值
 */
const instance = axios.create({
    baseURL:'/mapApi',
    // baseURL:'https://restapi.amap.com/v3',
    timeout: 15000, // 请求超时时间
    withCredentials: true
  })
/**
 * 添加请求拦截器 ，意思就是发起请求接口之前做什么事，一般都会发起加载一个loading
 */
 instance.interceptors.request.use(
    config => {
    // const token = store.state.user.tokenInfo.token

    // if (token) {
    //   config.headers.token = token
    // }
    //添加时间戳，防止页面缓存
        if (config.method == 'post') {
          config.data = {
            ...config.data,
          }
        } else if (config.method == 'get') {
        //   config.params = {
        //     ...config.params
        //   }
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
      let res = response
      return res
    },
    error => {
      return Promise.reject(error)
    }
  )
 class ajaxhttp {
    // 使用async ... await
    static async get (url,params) {
      // eslint-disable-next-line no-return-await
      console.log('参数',params)
      return await instance.get(url, {
        params: params
      })
    }
    static async post (url, params) {
      // eslint-disable-next-line no-return-await
      return await instance.post(url, qs.parse(params))
    }
    static async fliePost (url, params) {
      // eslint-disable-next-line no-return-await
      return await instance.post(url, params)
    }

  }


export default ajaxhttp
