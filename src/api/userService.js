import request from '../utils/request'
import port from '../utils/port'

//用户登录
export const UserLogin = (params) => request.post(port.UserLogin, params)
//用户注册
export const UserRegister = (params) => request.post(port.UserRegister, params)
