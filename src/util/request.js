import axios from 'axios'
import qs from 'qs'
import store from '../store'


// axios.defaults.baseURL = 'http://127.0.0.1:9527/'

/**
 * 自定义实例默认值
 */
const instance = axios.create({
    baseURL:'/api',
    //timeout: 300000, // 请求超时时间
    withCredentials: true
  })

/**
 * 添加请求拦截器 ，意思就是发起请求接口之前做什么事，一般都会发起加载一个loading
 */
 instance.interceptors.request.use(
    config => {
    
    let  token = '';
    let  refreshToken ='';
    if(store.state.userInfo != null){
      token = store.state.userInfo.token
      refreshToken = store.state.userInfo.refreshToken
    }

    if (token !=null) {
      config.headers.token = token
      config.headers.refreshToken = refreshToken
      config.headers.type = '1'
    }
    if(config.url == 'house/release' || config.url == '/house/editHouseRelease'){
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
      config.headers['Content-Type'] = 'multipart/form-data;boundary =' + new Date().getTime()

      console.log("config",config);
      return config
    }
    //添加时间戳，防止页面缓存
    console.log("fig",config);
        if (config.method == 'post') {
          
          config.data = {
            ...config.data,
            _t: Date.parse(new Date()) / 1000
          }

          console.log("11",config);
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
      return await instance.post(url, qs.parse(params))
    }
    static async filePost (url, params) {
      
      // console.log("参数",qs.stringify(params));
      // eslint-disable-next-line no-return-await
      return await instance.post(url, params)
    }
  }


export default ajaxhttp
