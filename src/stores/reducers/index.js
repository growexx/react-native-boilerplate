import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
import deviceInfoReducer from './deviceInfo.reducer'
import newsReducer from './news.reducer'
import { apiReducer } from './api.reducer'
//insert another reducers here to be combined

const reducers = combineReducers({
  authReducer,
  deviceInfoReducer,
  newsReducer,
  apiReducer
})

export default reducers
