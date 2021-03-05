import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
//insert another reducers here to be combined

const reducers = combineReducers({
  authReducer
})

export default reducers
