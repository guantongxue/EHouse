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

//根据城市名称获得所有区域
export const GetAllAreaByCity = (params) => request.post(port.GetAllAreaByCity,params)

//查询所有可选择城市
export const GetAllCity = (params) => request.get(port.GetAllCity,params)

//根据条件查询房源资源
export const SelectHouseByOption = (params) => request.post(port.SelectHouseByOption,params)

//根据ID查询房源资源
export const GetHouseResouceById = (params) => request.post(port.GetHouseResouceById,params)

//查询收藏状态
export const GetCollectionStatus = (params) => request.post(port.GetCollectionStatus,params)

//收藏房源
export const HouseIsCollection = (params) => request.post(port.HouseIsCollection,params)

//取消收藏房源
export const CancleCollection = (params) => request.post(port.CancleCollection,params)

//查询自己发布的房源
export const GetMyReleaseHouse = (params) => request.post(port.GetMyReleaseHouse,params)

//删除自己的的房源
export const DelMyReleaseHouse = (params) => request.post(port.DelMyReleaseHouse,params)

//查询个人的收藏房源信息
export const SelectMyCollection = (params) => request.post(port.SelectMyCollection,params)

//修改个人发布房源信息
export const EditHouseRelease = (params) => request.filePost(port.EditHouseRelease,params)



