export const handleCopy = async (url, messageApi) => {
    try {
        await navigator.clipboard.writeText(url);
        messageApi.success("Sao chép liên kết thành công")
    } catch (err) {
        messageApi.success("Xảy ra lỗi")
    }
};