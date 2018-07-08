

const initialState = false

export default function settingsReducer(state = initialState, action) {
    const { type, payload } = action;
    if (type === 'NEW_SETTINGS_STATE') {
        const active = payload || '';
        return state = active
    }
    return state;
}