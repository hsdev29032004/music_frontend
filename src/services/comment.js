import { _delete, _get, _patch, _post } from "../utils/request"

export const getListComment = async () => {
    const response = await _get(`/comment`)
    const result = await response.json()
    return result
}

export const getComment = async (musicId) => {
    const response = await _get(`/comment/${musicId}`)
    const result = await response.json()
    return result
}

export const allowComment = async (commentId) => {
    const response = await _patch(`/comment/allow/${commentId}`)
    const result = await response.json()
    return result
}

export const refuseComment = async (commentId) => {
    const response = await _delete(`/comment/refuse/${commentId}`)
    const result = await response.json()
    return result
}

export const createComment = async (data) => {
    const response = await _post(`/comment/create`, data)
    const result = await response.json()
    return result
}