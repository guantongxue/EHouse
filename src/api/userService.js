import request from '../util/request'
import port from '../util/port'

//用户登录
export const UserLogin = (params) => request.post(port.UserLogin, params)
//用户注册
export const UserRegister = (params) => request.post(port.UserRegister, params)
//查询是否重名
export const DuplicateName = (params) => request.post(port.DuplicateName, params)
//查询用户详细信息
export const SelectUseDetail = (params) => request.post(port.SelectUseDetail, params)
//修改用户密码
export const ChangePwd = (params) => request.post(port.ChangePwd, params)
//修改用户信息
export const ChangeUserInfo = (params) => request.post(port.ChangeUserInfo, params)