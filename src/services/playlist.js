import { _delete, _get, _patch, _post } from "../utils/request"

export const getListPlaylist = async (userId) => {
    const response = await _get(`/playlist/${userId}`)
    const result = await response.json()
    return result
}

export const getPlaylist = async (slug) => {
    const response = await _get(`/playlist/detail/${slug}`)
    const result = await response.json()
    return result
}

export const deletePlaylist = async (id) => {
    const response = await _delete(`/playlist/delete/${id}`)
    const result = await response.json()
    return result
}

export const createPlaylist = async (data) => {
    const response = await _post(`/playlist/create`, data)
    const result = await response.json()
    return result
}

export const editPlaylist = async (id, data) => {
    const response = await _patch(`/playlist/edit/${id}`, data)
    const result = await response.json()
    return result
}