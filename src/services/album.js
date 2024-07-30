import { _delete, _get, _patch, _post } from "../utils/request"

export const getListAlbum = async (keyword = "") => {
    const response = await _get(`/album?keyword=${keyword}`)
    const result = await response.json()
    return result
}

export const getOneAlbum = async (slug) => {
    const response = await _get(`/album/${slug}`)
    const result = await response.json()
    return result
}

export const createAlbum = async (data) => {
    const response = await _post(`/album/create`, data)
    const result = await response.json()
    return result
}

export const deleteAlbum = async (id) => {
    const response = await _delete(`/album/delete/${id}`)
    const result = await response.json()
    return result
}

export const editAlbum = async (id, data) => {
    const response = await _patch(`/album/edit/${id}`, data)
    const result = await response.json()
    return result
}

export const addMusicToAlbum = async (data) => {
    const response = await _patch(`/album/add/musicToAlbum`, data)
    const result = await response.json()
    return result
}