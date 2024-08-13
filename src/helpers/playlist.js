import { loadPl } from "../actions/loadPl";
import { closePlaylistMenuContext } from "../actions/menuContext";
import { getPlaylist } from "../services/playlist";
import {randomId} from "./random"

export const handleAddToWaitingList = async (playlist, dispatch, messageApi) => {
    let result = await getPlaylist(playlist.slug);
    result = result.data.music
    result.forEach(element => {
        element.key = element._id
        delete element._id
        element.id = randomId(10)
    });    

    const prevPl = JSON.parse(localStorage.getItem("queuePlaylist")) || []
    const newPl = [
        ...prevPl,
        ...result
    ]

    if(result.length > 0){
        localStorage.setItem('queuePlaylist', JSON.stringify(newPl));
        dispatch(closePlaylistMenuContext());
        dispatch(loadPl());
    }else{
        messageApi.error("Playlist rỗng", 1.5)
    }
};

export const handleAddMusicToWaitingList = async (music, dispatch) => {
    music.id = randomId(10)
    const prevPl = JSON.parse(localStorage.getItem("queuePlaylist")) || []
    const newPl = [
        ...prevPl,
        music
    ]

    localStorage.setItem('queuePlaylist', JSON.stringify(newPl));
    dispatch(closePlaylistMenuContext());
    dispatch(loadPl());
}