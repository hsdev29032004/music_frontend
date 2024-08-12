import { message } from "antd";
import { useRef, useState } from "react";
import { changePassword } from "../../services/user";
import { useSelector } from "react-redux";

export default function ChangePassword({ open, setOpen }) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [inputValue, setInputValue] = useState({})

    const formRef = useRef(null)

    const [messageApi, contextHolder] = message.useMessage()    

    const user = useSelector(state => state.loginReducer)    

    const handleOk = async () => {
        setConfirmLoading(true);

        setTimeout(async () => {
            const result = await changePassword(user.value._id, inputValue)
            if (result.status === "success") {                
                setConfirmLoading(false);
                formRef.current.reset()
                messageApi.success(result.msg)
            } else {
                messageApi.error(result.msg)
                setConfirmLoading(false);
            }
        }, 1000)
    };

    const handleChange = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        })
    }

    const handleCancel = () => {
        setInputValue({})
        setOpen(false)
    }
    if(!open) return null

    return (
        <>
            {contextHolder}
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2 className="modal-title text-center">Đổi mật khẩu</h2>
                    <form ref={formRef} className="modal-body">
                        <div className="mb-2">
                            <label>Mật khẩu</label>
                            <input onChange={handleChange} placeholder='Nhập mật khẩu' name="currentPassword" className='input input-modal mb-2'></input>
                        </div>

                        <div className="mb-2">
                            <label>Mật khẩu mới</label>
                            <input type="password" onChange={handleChange} placeholder='Nhập mật khẩu mới' name="newPassword" className='input input-modal mb-2'></input>
                        </div>
                        
                        <div>
                            <label>Nhập lại mật khẩu mới</label>
                            <input type="password" onChange={handleChange} placeholder='Nhập lại mật khẩu mới' name="reNewPassword" className='input input-modal'></input>
                        </div>
                    </form>
                    <div className="modal-footer">
                        <button className="btn-close-modal" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button
                            className="btn-purple"
                            onClick={handleOk}
                            disabled={confirmLoading}
                        >
                            {confirmLoading ? 'Loading...' : 'Đổi mật khẩu'}
                        </button>
                    </div>
                    <span onClick={handleCancel} style={{ position: "absolute", top: "0px", right: "7px", cursor: "pointer" }}>
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                </div>
            </div>
        </>
    )
}