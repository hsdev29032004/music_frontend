import { _get, _post } from "../utils/request"

export const getListSinger = async () => {
    const response = await _get(`/singer`)
    const result = await response.json()
    return result
}

export const getSinger = async (slug) => {
    const response = await _get(`/singer/${slug}`)
    const result = await response.json()
    return result
}

export const createSinger = async (data) => {
    const response = await _post(`/singer/create`, data)
    const result = await response.json()
    return result
}

export const editSinger = async (id, data) => {
    const response = await _post(`/singer/edit/${id}`, data)
    const result = await response.json()
    return result
}