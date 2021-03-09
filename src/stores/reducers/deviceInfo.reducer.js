import { UPDATE_NET_STATUS, CLEAR_REDUX } from '@types/deviceInfo.types'

const initialState = {
  isConnected: false,
  type: null
}

export const deviceInfoReducer = (state = initialState, action) => {
  const { type, data } = action
  switch (action.type) {
    case UPDATE_NET_STATUS:
      return {
        ...state,
        isConnected: data,
        type
      }

    case CLEAR_REDUX:
      return {
        ...state,
        type: null
      }

    default:
      return state
  }
}

export default deviceInfoReducer
