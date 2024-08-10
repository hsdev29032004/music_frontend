import { combineReducers } from "redux";
import { loginReducer } from "./login";
import { modalReducer } from "./modal";
import { playlistContextMenuReducer, musicInPlContextMenuReducer } from "./menuContext";
import { loadPlReducer } from "./loadPl";
import { savePlReducer } from "./savePl";

const allReducers = combineReducers({
    loginReducer,
    modalReducer,
    playlistContextMenuReducer,
    musicInPlContextMenuReducer,
    loadPlReducer,
    savePlReducer
});

export default allReducers;
