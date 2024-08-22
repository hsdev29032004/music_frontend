import { combineReducers } from "redux";
import { loginReducer } from "./login";
import { modalReducer } from "./modal";
import { playlistContextMenuReducer, musicInPlContextMenuReducer, AlbumContextMenuReducer } from "./menuContext";
import { loadPlReducer } from "./loadPl";
import { reloadReducer } from "./reload";

const allReducers = combineReducers({
    loginReducer,
    modalReducer,
    playlistContextMenuReducer,
    musicInPlContextMenuReducer,
    AlbumContextMenuReducer,
    loadPlReducer,
    reloadReducer
});

export default allReducers;
