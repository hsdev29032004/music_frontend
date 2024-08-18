export const playlistContextMenuReducer = (state = {}, action) => {
    switch (action.type) {
        case "OPEN_PLAYLIST_MENUCONTEXT":
            return {
                ...state,
                playlistOpen: true,
            };
        case "CLOSE_PLAYLIST_MENUCONTEXT":
            return {
                ...state,
                playlistOpen: false,
            };
        default:
            return state;
    }
};

export const musicInPlContextMenuReducer = (state = {}, action) => {
    switch (action.type) {
        case "OPEN_MUSICINPL_MENUCONTEXT":
            return {
                ...state,
                musicInPlOpen: true,
                data: action.payload
            };
        case "CLOSE_MUSICINPL_MENUCONTEXT":
            return {
                ...state,
                musicInPlOpen: false,
                data: action.payload
            };
        default:
            return state;
    }
}

export const AlbumContextMenuReducer = (state = {}, action) => {
    switch (action.type) {
        case "OPEN_ALBUM_MENUCONTEXT":
            return {
                ...state,
                albumOpen: true,
                data: action.payload
            }
        case "CLOSE_ALBUM_MENUCONTEXT":
            return {
                ...state,
                albumOpen: false,
                // data: action.payload
            }
        default:
            return state
    }
}