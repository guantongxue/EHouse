/**
 * 统一定义接口，有利于维护
 * 不同环境配置不同的地址
 */
 let baseURL = 'http://127.0.0.1:9527/'
 const PORTS = {
   UserLogin: baseURL + '/user/login',
   UserRegister: baseURL + '/user/register',
 }
 
 export default PORTS