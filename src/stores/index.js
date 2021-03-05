import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import reducers from '@reducers'
import configs from '@constants/configs'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

var middlewares = [thunk]

if (configs.ENV !== 'Production') {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: []
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(...middlewares))
)

export const persistore = persistStore(store)
