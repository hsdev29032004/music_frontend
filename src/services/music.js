import { _get, _patch, _post } from "../utils/request"

export const getListMusic = async (keyword = "") => {
    const response = await _get(`/music?keyword=${keyword}`)
    const result = await response.json()
    return result
}

export const getOneMusic = async (slug) => {
    const response = await _get(`/music/${slug}`)
    const result = await response.json()
    return result
}

export const createMusic = async (data) => {
    const response = await _post(`/music/create`, data)
    const result = await response.json()
    return result
}

export const deleteOneMusic = async (id) => {
    const response = await _patch(`/music/delete/${id}`)
    const result = await response.json()
    return result
}

export const editMusic = async (id, data) => {
    const response = await _patch(`/music/edit/${id}`, data)
    const result = await response.json()
    return result
}

export const getLyrics = async (name) => {
    const response = await _get(`/music/zingmp3/crawl-lyrics?name=${name}`)
    const result = await response.json()
    return result
}

export const addToPlaylist = async (data) => {
    const response = await _post(`/music/add/toPlaylist`, data)   
    const result = await response.json()
    return result
}

export const deleteFromPlaylist = async (data) => {
    const response = await _post(`/music/deleteFromPlaylist`, data)   
    const result = await response.json()
    return result
}

export const getMusicRank = async () => {
    const response = await _get(`/music/get/rank`)
    const result = await response.json()
    return result
}