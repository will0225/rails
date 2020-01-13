import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import createLogger from 'redux-logger'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import Root from './components/Root'
import rootReducer from './reducers/index'
import registerServiceWorker from './registerServiceWorker'

const loggerMiddleware = createLogger()
const routingMiddleware = routerMiddleware(browserHistory)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware,
        promiseMiddleware,
        loggerMiddleware,
        routingMiddleware
      )
    )
  )
}

ReactDOM.render(
  <Root store={store} history={history} />, document.getElementById('root')
)
registerServiceWorker()

