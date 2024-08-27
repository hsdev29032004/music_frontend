export const modalReducer = (state = {}, action) => {
    switch (action.type) {
        case "OPEN_MODAL_CREATE_PLAYLIST":
            return {
                ...state,
                isCreatePlaylistOpen: true,
            };
        case "CLOSE_MODAL_CREATE_PLAYLIST":
            return {
                ...state,
                isCreatePlaylistOpen: false,
            };
        case "OPEN_MODAL_EDIT_PLAYLIST":
            return {
                ...state,
                isEditPlaylistOpen: true,
            };
        case "CLOSE_MODAL_EDIT_PLAYLIST":
            return {
                ...state,
                isEditPlaylistOpen: false,
            };
        case "OPEN_MODAL_EDIT_ALBUM":
            return {
                ...state,
                isEditAlbumOpen: true,
            };
        case "CLOSE_MODAL_EDIT_ALBUM":
            return {
                ...state,
                isEditAlbumOpen: false,
            };
        case "OPEN_MODAL_EDIT_MUSIC":
            return {
                ...state,
                isEditMusicOpen: true,
            };
        case "CLOSE_MODAL_EDIT_MUSIC":
            return {
                ...state,
                isEditMusicOpen: false,
            };
        case "OPEN_MODAL_CREATE_MUSIC":
            return {
                ...state,
                isCreateMusicOpen: true,
                data: action.payload
            };
        case "CLOSE_MODAL_CREATE_MUSIC":
            return {
                ...state,
                isCreateMusicOpen: false,
                data: action.payload
            };
        case "OPEN_MODAL_CREATE_ALBUM":
            return {
                ...state,
                isCreateAlbumOpen: true,
                data: action.payload
            };
        case "CLOSE_MODAL_CREATE_ALBUM":
            return {
                ...state,
                isCreateAlbumOpen: false,
                data: action.payload
            };
        default:
            return state;
    }
};
