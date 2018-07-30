import {
    NEW_SETTINGS_STATE,
    NEW_NORM_AND_VOLUME
} from '../constants.js';

export function toggleActive(settingsState) {
    return {
        type: NEW_SETTINGS_STATE,
        payload: settingsState
    }
}

export function setNewNormAndVolume(obj) {

    return {
        type: NEW_NORM_AND_VOLUME,
        payload: obj
    }
}

