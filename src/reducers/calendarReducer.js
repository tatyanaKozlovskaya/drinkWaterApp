const initialState = {
    month: '',
    year: ''
};


export default function calendarReducer(state = initialState, action) {
    const { type, payload } = action;
    if (type === 'NEW_MONTH') {
        const month = payload || '';
        return {
            ...state,
            month
        };
    } else if (type === 'NEW_YEAR') {
        const year = payload || '';
        return {
            ...state,
            year
        };
    }
    return state;
}
