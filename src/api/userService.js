import request from '../util/request'
import port from '../util/port'

//用户登录
export const UserLogin = (params) => request.post(port.UserLogin, params)
//用户注册
export const UserRegister = (params) => request.post(port.UserRegister, params)
//查询是否重名
export const DuplicateName = (params) => request.post(port.DuplicateName, params)
