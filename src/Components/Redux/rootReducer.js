import { combineReducers } from 'redux'
import { channelsReducer } from './channelsReducer'

export const rootReducer = combineReducers({
    channels: channelsReducer,
})