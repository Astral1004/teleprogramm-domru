import { GET_CHANNELS } from './types'
import { GET_CHANNELS_PROGRAMMS } from './types'

const initialState = {
    channels: [],
    programms: [],
    visiblePopup: false,
}

export const channelsReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_CHANNELS:
            return {
                ...state,
                channels: [actions.payload],
                programms: []
            }
        case GET_CHANNELS_PROGRAMMS:

            return {
                ...state,
                programms: [actions.payload]
            }
        default: return state
    }
}