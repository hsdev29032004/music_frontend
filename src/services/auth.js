import { _get, _post } from "../utils/request"

export const register = async (data) => {
    const response = await _post("/auth/register", data)
    const result = await response.json()
    return result
}

export const login = async (data) => {
    const response = await _post("/auth/login", data)
    const result = await response.json()
    return result
}

export const logout = async () => {
    const response = await _post("/auth/logout")
    const result = await response.json()
    return result
}

export const checkLogin = async () => {
    const response = await _get("/auth/check-login")
    const result = await response.json()
    return result
}