import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import mainReducer from './mainReducer'
import settingsReducer from './settingsReducer'

export default combineReducers({
    main: mainReducer,
    settings: settingsReducer,
    router: routerReducer
})