import { createPayment } from "../services/payment"

export const handleUpgrate = async (messageApi) => {
    const result = await createPayment()
    if(result.data){
        window.location.href = result.data.payUrl
    }else{
        messageApi.error(result.msg)
    }
}
