
import request from '../util/request'
import port from '../util/mapPort'
// import qs from 'qs'
const key='4ce136b9d07cd583aaa787e820f12d50'
// const key ={
//     key:'4ce136b9d07cd583aaa787e820f12d50'
// }

export const getPosition  = () => request.get(port.getPosition)