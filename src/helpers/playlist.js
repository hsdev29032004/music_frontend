import { loadPl } from "../actions/loadPl";
import { closeAlbumMenuContext, closePlaylistMenuContext } from "../actions/menuContext";
import { getOneAlbum } from "../services/album";
import { getPlaylist } from "../services/playlist";
import {randomId} from "./random"

export const handleAddToWaitingList = async (data, dispatch, messageApi, type) => {
    let result
    switch (type) {
        case "PLAYLIST":
            result = await getPlaylist(data.slug);
            result = result.data.music
            break;
        case "ALBUM":
            result = await getOneAlbum(data.slug)
            result = result.data.infoMusic
            break;
        default:
            break;
    }
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
        // dispatch(closePlaylistMenuContext());
        // dispatch(closeAlbumMenuContext())
        dispatch(loadPl());
        messageApi.success("Đã thêm vào danh sách bài hát chờ")
    }else{
        messageApi.error("Thư mục rỗng", 1.5)
    }
};

export const handleReplaceWaitingList = async (data, dispatch, messageApi, type) => {
    let result
    switch (type) {
        case "PLAYLIST":
            result = await getPlaylist(data.slug);
            result = result.data.music
            break;
        case "ALBUM":
            result = await getOneAlbum(data.slug)
            result = result.data.infoMusic
            break;
        default:
            break;
    }
    result.forEach(element => {
        element.key = element._id
        delete element._id
        element.id = randomId(10)
    });    

    if(result.length > 0){
        localStorage.removeItem("currentId")
        localStorage.setItem('queuePlaylist', JSON.stringify(result));
        dispatch(closePlaylistMenuContext());
        dispatch(loadPl());
    }else{
        messageApi.error("Thư mục rỗng", 1.5)
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