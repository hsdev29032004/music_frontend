import { useState, useEffect, useRef } from 'react';
import './Modal.css';
import { message } from 'antd';
import { editPlaylist } from "../../services/playlist"
import { useDispatch, useSelector } from 'react-redux';
import { closeModalEditPlaylist } from '../../actions/modal';

export default function EditPlaylist(props) {
    const { onPlChange, playlist } = props;    

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const inputRef = useRef(null);
    const dispatch = useDispatch()
    
    const open = useSelector(state => state.modalReducer.isEditPlaylistOpen)    

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.value = playlist.name
        }
        // eslint-disable-next-line
    }, [open]);

    const handleOk = async () => {
        const inputElement = document.querySelector('.input-modal');
        if (!inputElement.value.trim()) {
            return messageApi.error("Chưa nhập tên playlist.")
        }        

        setConfirmLoading(true);

        setTimeout(async () => {
            const result = await editPlaylist( playlist._id, {name: inputElement.value})
            if (result.status === "success") {
                dispatch(closeModalEditPlaylist())
                setConfirmLoading(false);
                onPlChange()
                messageApi.success(result.msg)
            } else {
                messageApi.error(result.msg)
                setConfirmLoading(false);
            }
        }, 1000)
    };

    const handleCancel = async () => {
        dispatch(closeModalEditPlaylist())
    };

    if (!open) return null;

    return (
        <>
            {contextHolder}
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2 className="modal-title">Chỉnh sửa playlist</h2>
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
                            {confirmLoading ? 'Loading...' : 'Chỉnh sửa'}
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
