import { _get, _patch, _post } from "../utils/request"

export const getListSinger = async (keyword = "") => {
    const response = await _get(`/singer?keyword=${keyword}`)
    const result = await response.json()
    return result
}

export const getSinger = async (slug) => {
    const response = await _get(`/singer/${slug}`)
    const result = await response.json()
    return result
}

export const getAlbumsBySingerId = async (slug) => {
    const response = await _get(`/singer/${slug}/albums`)
    const result = await response.json()
    return result
}

export const createSinger = async (data) => {
    const response = await _post(`/singer/create`, data)
    const result = await response.json()
    return result
}

export const editSinger = async (id, data) => {
    const response = await _patch(`/singer/edit/${id}`, data)
    const result = await response.json()
    return result
}