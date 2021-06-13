import { GET_CHANNELS } from "./types";
import { GET_CHANNELS_PROGRAMMS } from "./types";

export function getChannelsSucess(channels) {
    return {
        type: GET_CHANNELS,
        payload: channels
    }
}

export function getChannels() {
    return (dispatch) => {
        fetch('https://epg.domru.ru/channel/list?domain=ekat')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(channels => dispatch(getChannelsSucess(channels)))
    }
}

export function getProgrammsSucess(programms) {
    return {
        type: GET_CHANNELS_PROGRAMMS,
        payload: programms
    }
}

export function getProgramms(dateFrom, dateTo, xvid) {
    return (dispatch) => {
        fetch(`https://epg.domru.ru/program/list?date_from=${dateFrom}+00%3A00%3A00&date_to=${dateTo}%3A00%3A00&xvid[0]=${xvid}&domain=ekat`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(programms => dispatch(getProgrammsSucess(programms)))
    }
}

