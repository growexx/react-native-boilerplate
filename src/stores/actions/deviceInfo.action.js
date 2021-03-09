import { UPDATE_NET_STATUS } from '@types/deviceInfo.types'

export const updateNetStatus = status => {
  return {
    type: UPDATE_NET_STATUS,
    data: status
  }
}
