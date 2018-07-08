import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import mainReducer from './mainReducer'
import calendarReducer from './calendarReducer'
import settingsReducer from './settingsReducer'

export default combineReducers({
    main: mainReducer,
    calendar: calendarReducer,
    settings: settingsReducer,
    router: routerReducer
})