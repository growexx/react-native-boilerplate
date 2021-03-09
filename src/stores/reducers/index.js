import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
import { deviceInfoReducer } from "./deviceInfo.reducer"
//insert another reducers here to be combined

const reducers = combineReducers({
  authReducer,
  deviceInfoReducer
})

export default reducers
