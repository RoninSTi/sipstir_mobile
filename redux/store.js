import { applyMiddleware, createStore } from 'redux'
import { multiClientMiddleware } from 'redux-axios-middleware'

import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers/reducer'
import rootSaga from './saga/saga'
import clients from '../services/api'

import env from '../environment'

const sagaMiddleware = createSagaMiddleware()

const middleware = [multiClientMiddleware(clients), sagaMiddleware]

if (env.reduxLoggerEnabled) {
  middleware.push(logger)
}

const store = createStore(reducer, applyMiddleware(...middleware))

sagaMiddleware.run(rootSaga)

export default store
