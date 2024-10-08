import { useState, useEffect, useRef } from 'react';
import { message } from 'antd';
import { createPlaylist } from "../../services/playlist"
import { useDispatch } from 'react-redux';
import { closeModalCreatePlaylist } from '../../actions/modal';
import { reloadPlaylist } from '../../actions/reload';

export default function CreatePlaylist() {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const inputRef = useRef(null);
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleOk = async () => {
        const inputElement = document.querySelector('.input-modal');
        if (!inputElement.value.trim()) {
            return messageApi.error("Chưa nhập tên playlist.")
        }

        setConfirmLoading(true);

        setTimeout(async () => {
            const result = await createPlaylist({ name: inputElement.value })
            if (result.status === "success") {
                dispatch(closeModalCreatePlaylist())
                dispatch(reloadPlaylist())
                setConfirmLoading(false);
                messageApi.success(result.msg)
            } else {
                messageApi.error(result.msg)
                setConfirmLoading(false);
            }
        }, 1000)
    };

    const handleCancel = async () => {
        dispatch(closeModalCreatePlaylist())
    };

    return (
        <>
            {contextHolder}
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2 className="modal-title">Tạo mới playlist</h2>
                    <div className="modal-body">
                        <input ref={inputRef} placeholder='Nhập tên playlist' className='input input-modal'></input>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-close-modal" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button
                            className="btn-purple"
                            onClick={handleOk}
                            disabled={confirmLoading}
                        >
                            {confirmLoading ? 'Loading...' : 'Tạo mới'}
                        </button>
                    </div>
                    <span onClick={handleCancel} style={{ position: "absolute", top: "0px", right: "7px", cursor: "pointer" }}>
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                </div>
            </div>
        </>
    );
}
