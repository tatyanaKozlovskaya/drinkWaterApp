import {
    NEW_SETTINGS_STATE,
    NEW_NORM_AND_VOLUME
} from '../constants.js';

export function toggleActive(settingsState) {
    const newSettingsState = !settingsState;
    return {
        type: NEW_SETTINGS_STATE,
        payload: newSettingsState
    }
}