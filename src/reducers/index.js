import { combineReducers } from "redux";
import { loginReducer } from "./login";
import { modalReducer } from "./modal";
import { playlistContextMenuReducer, musicInPlContextMenuReducer, albumContextMenuReducer, musicContextMenuReducer } from "./menuContext";
import { loadPlReducer } from "./loadPl";
import { reloadReducer } from "./reload";
import { savePlReducer } from "./savePl";

const allReducers = combineReducers({
    loginReducer,
    modalReducer,
    playlistContextMenuReducer,
    musicInPlContextMenuReducer,
    albumContextMenuReducer,
    musicContextMenuReducer,
    loadPlReducer,
    reloadReducer,
    savePlReducer
});

export default allReducers;
