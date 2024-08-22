// Chức năng
// User: Thêm vào danh sách nhạc chờ, coppy link
// Admin: ..., sửa, xóa
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { closeAlbumMenuContext } from "../../actions/menuContext";
import { handleCopy } from "../../helpers/copy";
import { handleAddToWaitingList } from "../../helpers/playlist";
import { openModalEditAlbum } from "../../actions/modal";
import "../Modal/Modal.css"
import { deleteAlbum } from "../../services/album";
import { reloadPlaylist } from "../../actions/reload";

export default function AlbumContextMenu({user, menuPosition, album, messageApi}) {
    const contextMenuRef = useRef(null);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleClickOutside = (event) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
            dispatch(closeAlbumMenuContext());
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
        // eslint-disable-next-line
    }, []);

    const handleCancel = () => {
        setOpen(false)
    }

    const handleOk = async () => {
        setConfirmLoading(true)

        const result = await deleteAlbum(album?._id)
        if(result.status === "success"){
            dispatch(reloadPlaylist())
            messageApi.success(result.msg)
            setOpen(false)
            setConfirmLoading(false)
        }else{
            messageApi.error(result.msg)
        }
    }

    const menuStyles = () => {
        // if (!isMenuOpen) return {};
        
        const menuHeight = user?.level === 3 ? 200 : 110;
        const menuWidth = 260;

        const { top, left } = menuPosition;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let adjustedTop = top + 10;
        let adjustedLeft = left + 10;

        if (adjustedTop + menuHeight > windowHeight) {
            adjustedTop = top - menuHeight;
        }

        if (adjustedLeft + menuWidth > windowWidth) {
            adjustedLeft = adjustedLeft - menuWidth;
        }

        return {
            position: 'fixed',
            top: adjustedTop,
            left: adjustedLeft,
            zIndex: 1000,
        };
    };

    return /*isMenuOpen ? */(
        <>
            <div
                ref={contextMenuRef}
                className="context-menu"
                style={menuStyles()}
            >
                <ul style={{ color: "white" }}>
                    <li onClick={() => handleAddToWaitingList(album, dispatch, messageApi, "ALBUM")}>
                        <i className="fa-regular fa-list-music"></i>
                        <button>Thêm vào danh sách phát</button>
                    </li>
                    <li
                        onClick={() => handleCopy(`http://localhost:3000/album/${album.slug}`, messageApi)}
                    >
                        <i className="fa-solid fa-link"></i>
                        <button>Sao chép liên kết</button>
                    </li>
                    {user.level === 3 ? (
                        <>
                            <li onClick={() => dispatch(openModalEditAlbum())}>
                                <i className="fa-solid fa-pen-to-square"></i>
                                <button>Chỉnh sửa album</button>
                            </li>
                            <li onClick={() => setOpen(true)}>
                                <i className="fa-solid fa-trash"></i>
                                <button>Xóa Album</button>
                            </li>
                        </>
                    ) : null}
                </ul>
                {open ? (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2 className="modal-title">Bạn có chắc muốn xóa?</h2>
                            <div className="modal-body">
                                <p>Sau khi xóa sẽ không thể khôi phục</p>
                            </div>
                            <div className="modal-footer" style={{flexWrap: "nowrap"}}>
                                <button style={{width: "unset", backgroundColor: "#787878", color: "white", padding: "7px 19px"}} className="btn-close-modal" onClick={handleCancel}>
                                    Cancel
                                </button>
                                <button
                                    style={{width: "unset", backgroundColor: "red", color: "white", padding: "7px 19px"}}
                                    className="btn-purple"
                                    onClick={handleOk}
                                    disabled={confirmLoading}
                                >
                                    {confirmLoading ? 'Loading...' : 'Xóa'}
                                </button>
                            </div>
                            <span onClick={handleCancel} style={{ position: "absolute", top: "0px", right: "7px", cursor: "pointer" }}>
                                <i className="fa-solid fa-xmark"></i>
                            </span>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    )/* : null; */
}
