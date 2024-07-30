import { _get } from "../utils/request"

export const getComment = async (musicId) => {
    const response = await _get(`/comment/${musicId}`)
    const result = await response.json()
    return result
}