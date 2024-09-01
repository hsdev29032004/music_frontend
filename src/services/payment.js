import { _post } from "../utils/request"

export const createPayment = async () => {
    const response = await _post(`/payment`)
    const result = await response.json()
    return result
}