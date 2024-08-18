import { combineReducers } from "redux";
import { loginReducer } from "./login";
import { modalReducer } from "./modal";
import { playlistContextMenuReducer, musicInPlContextMenuReducer, AlbumContextMenuReducer } from "./menuContext";
import { loadPlReducer } from "./loadPl";
import { savePlReducer } from "./savePl";

const allReducers = combineReducers({
    loginReducer,
    modalReducer,
    playlistContextMenuReducer,
    musicInPlContextMenuReducer,
    AlbumContextMenuReducer,
    loadPlReducer,
    savePlReducer
});

export default allReducers;
