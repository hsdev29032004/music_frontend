import { _get, _patch } from "../utils/request";

export const getListUser = async (keyword = "") => {
    const response = await _get(`/user?keyword=${keyword}`)
    const result = await response.json()
    return result
}

export const getUser = async (slug) => {
    const response = await _get(`/user/${slug}`)
    const result = await response.json()
    return result
}

export const editUser = async (id, data) => {
    const response = await _patch(`/user/edit/${id}`, data)
    const result = await response.json()
    return result
}

export const changePassword = async (id, data) => {
    const response = await _patch(`/user/change-password/${id}`, data)
    const result = await response.json()
    return result
}

export const getLibrary = async (id) => {
    const response = await _get(`/user/library/${id}`)
    const result = await response.json()
    return result
}