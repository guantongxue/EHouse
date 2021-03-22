import request from '../util/request'
import port from '../util/houseResoucePort'

//查询所有区域
export const GetCityArea = () => request.get(port.GetCityArea)

//查询所有房型
export const GetHouseType = () => request.get(port.GetHouseType)

//查询所有环境
export const GetEnvironment = () => request.get(port.GetEnvironment)

//发布房源
export const HouseRelease = (params) => request.filePost(port.HouseRelease,params)