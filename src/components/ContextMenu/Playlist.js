import { useRef, useEffect } from 'react';
import {useDispatch} from "react-redux"
import { closePlaylistMenuContext } from '../../actions/menuContext';
import { deletePlaylist } from '../../services/playlist';
import { message } from 'antd';
import { openModalEditPlaylist } from '../../actions/modal';
import { handleAddToWaitingList } from '../../helpers/playlist';
import { handleCopy } from '../../helpers/copy';
import { reloadPlaylist } from '../../actions/reload';

export default function PlaylistContextMenu({ menuPosition, playlist }){        
    const [messageApi, contextHolder] = message.useMessage();
    const contextMenuRef = useRef(null);
    const dispatch = useDispatch()
    
    const handleClickOutside = (event) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)){
            dispatch(closePlaylistMenuContext())
        }
    };

    const handleDeletePlaylist = async () => {
        const result = await deletePlaylist(playlist._id)
        
        if(result.status === "success"){
            dispatch(reloadPlaylist())
            dispatch(closePlaylistMenuContext())
        }else{
            messageApi.error(result.message)
        }
    }

    const handleEditPlaylist = async () => {
        dispatch(closePlaylistMenuContext())
        dispatch(openModalEditPlaylist())
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    // eslint-disable-next-line
    }, []);

    const menuStyles = () => {
        const { top, left } = menuPosition;
        const menuHeight = 200;
        const windowHeight = window.innerHeight;

        let adjustedTop = top + 10;

        if (adjustedTop + menuHeight > windowHeight) {
            adjustedTop = top - menuHeight - 10;
        }

        return {
            position: 'fixed',
            top: adjustedTop,
            left: left + 10,
            zIndex: 1000,
        };
    };

    return (
            <>
                {contextHolder}
                <div
                    ref={contextMenuRef}
                    className="context-menu"
                    style={menuStyles()}
                >
                    <ul style={{color: "white"}}>
                        <li onClick={() => handleAddToWaitingList(playlist, dispatch, messageApi, "PLAYLIST")}>
                            <i className="fa-solid fa-play"></i>
                            <button>Thêm vào danh sách phát</button>
                        </li>
                        <li onClick={handleEditPlaylist}>
                            <i className="fa-solid fa-pen-to-square"></i>
                            <button>Chỉnh sửa playlist</button>
                        </li>
                        <li onClick={handleDeletePlaylist}>
                            <i className="fa-solid fa-trash"></i>
                            <button>Xóa playlist</button>
                        </li>
                        <li
                            onClick={() => handleCopy(`http://localhost:3000/playlist/${playlist.slug}`, messageApi)}
                        >
                            <i className="fa-solid fa-link"></i>
                            <button>Sao chép liên kết</button>
                        </li>
                    </ul>
                </div>
            </>
        )
};