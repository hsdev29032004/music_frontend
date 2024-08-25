import { _post } from "../utils/request"

export const likeMusic = async (musicId, userId) => {
    const response = await _post(`/favorite/music/${musicId}/${userId}`)
    const result = await response.json()
    return result
}

export const likeAlbum = async (albumId, userId) => {
    const response = await _post(`/favorite/album/${albumId}/${userId}`)
    const result = await response.json()
    return result
}

export const subcribeSinger = async (singerId, userId) => {
    const response = await _post(`/favorite/singer/${singerId}/${userId}`)
    const result = await response.json()
    return result
}