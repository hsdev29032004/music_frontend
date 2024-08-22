let initState = {
    albumChange: false,
    playlistChange: false
}
export const reloadReducer = (state = initState, action) => {
    switch (action.type) {
        case "RELOAD_ALBUM":
            return {
                ...state,
                albumChange: !state.albumChange
            }
        case "RELOAD_PLAYLIST":
            return {
                ...state,
                playlistChange: !state.playlistChange
            }
        default:
            return state
    }

}