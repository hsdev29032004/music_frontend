const initialState = {
    open: false,
};

export const modalReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
};
