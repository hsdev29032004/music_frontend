import { _get, _post } from "../utils/request"

export const getListMusicType = async (keyword = "") => {
    const response = await _get(`/music-type?keyword=${keyword}`)
    const result = await response.json()
    return result
}

export const getMusicType = async (slug) => {
    const response = await _get(`/music-type/${slug}`)
    const result = await response.json()
    return result
}

export const createMusicType = async (data) => {
    const response = await _post(`/music-type/create`, data)
    const result = await response.json()
    return result
}