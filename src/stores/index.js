import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import reducers from '@reducers'
import { configs } from '@constants'

var middlewares = [thunk]

if (configs.ENV !== 'Production') {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer']
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middlewares))
)

export const persistore = persistStore(store)
