import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
import deviceInfoReducer from './deviceInfo.reducer'
import newsReducer from './news.reducer'
//insert another reducers here to be combined

const reducers = combineReducers({
  authReducer,
  deviceInfoReducer,
  newsReducer
})

export default reducers
