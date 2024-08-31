import { loadPl } from "../actions/loadPl";
import { closePlaylistMenuContext } from "../actions/menuContext";
import { getOneAlbum } from "../services/album";
import { getPlaylist } from "../services/playlist";
import { getSinger } from "../services/singer";
import {randomId} from "./random"

export const handleAddToWaitingList = async (data, dispatch, messageApi, type) => {
    try {
        let result
    switch (type) {
        case "PLAYLIST":
            result = await getPlaylist(data.slug);
            result = result.data?.music
            break;
        case "ALBUM":
            result = await getOneAlbum(data.slug)
            result = result.data?.infoMusic
            break;
        case "MUSIC":
            result = [data]
            break
        default:
            break;
    }
    result?.forEach(element => {
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
    } catch (error) {
        messageApi.error("Lỗi hệ thống")
    }
};

export const handleReplaceWaitingList = async (data, dispatch, messageApi, type) => {
    let result
    switch (type) {
        case "PLAYLIST":
            result = await getPlaylist(data.slug);
            result = result.data?.music
            break;
        case "ALBUM":
            result = await getOneAlbum(data.slug)
            result = result.data?.infoMusic
            break;
        case "SINGER":
            result = await getSinger(data.slug)
            result = result.data?.infoMusic
            break
        case "MUSIC":
            result = [data]
            break
        default:
            break;
    }
    
    result?.forEach(element => {
        element.key = element._id
        delete element._id
        element.id = randomId(10)
    });    

    if(result?.length > 0){
        localStorage.removeItem("currentId")
        localStorage.setItem('queuePlaylist', JSON.stringify(result));
        dispatch(closePlaylistMenuContext());
        dispatch(loadPl());
        messageApi.success("Phát thành công")
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