
import request from '../util/request'
import port from '../util/ChatPort'

export const GetAllChatMessage = (params) => request.post(port.GetAllChatMessage, params)