import { _post } from "../utils/request"

export const postRequest = async (email) => {
    const response = await _post(`/forgot-password`, email)
    const result = await response.json()
    return result
}

export const postOtp = async (otp) => {
    const response = await _post(`/forgot-password/otp`, otp)
    const result = await response.json()
    return result
}

export const resetPassword = async (data) => {
    const response = await _post(`/forgot-password/reset`, data)
    const result = await response.json()
    return result
}