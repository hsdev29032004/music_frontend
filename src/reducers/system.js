export const systemInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case "SYSTEM":
            return action.payload
        default:
            return state;
    }
}