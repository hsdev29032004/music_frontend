export const loadPlReducer = (state = false, action) => {
    switch (action.type) {
        case "LOAD_PLAYLIST":
            return !state
        default:
            return state;
    }
};