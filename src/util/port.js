/**
 * 统一定义接口，有利于维护
 * 不同环境配置不同的地址
 */
//  let baseURL = 'http://127.0.0.1:9527/'
 const PORTS = {
   UserLogin: 'user/login',
   UserRegister:  'user/register',
   DuplicateName: 'user/duplicateName'
   
 }
 
 export default PORTS