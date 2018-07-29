import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux'

import reducer from './reducers'

import App from './App.js'



const history = createHistory()

const middleware = routerMiddleware(history)

const store = createStore(
    reducer,
    applyMiddleware(middleware)
)

store.subscribe(() => {
    console.log('subscribe',store.getState());
})

store.dispatch({
    type:'DATE',
    payload:Date.now()
})

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')

)

registerServiceWorker()