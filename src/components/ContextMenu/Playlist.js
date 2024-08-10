import React, { /*useState,*/useRef, useEffect } from 'react';
import './ContextMenu.css';
import {useDispatch, useSelector} from "react-redux"
import { closePlaylistMenuContext } from '../../actions/menuContext';
import { deletePlaylist, getPlaylist } from '../../services/playlist';
import { message } from 'antd';
import { openModalEditPlaylist } from '../../actions/modal';
import { loadPl } from '../../actions/loadPl';
import { randomId } from '../../helpers/random';

export default function PlaylistContextMenu({ menuPosition, playlist, onPlChange }){        
    const [messageApi, contextHolder] = message.useMessage();
    const contextMenuRef = useRef(null);
    const dispatch = useDispatch()

    const isMenuOpen = useSelector(state => state.playlistContextMenuReducer.playlistOpen)
    // console.log(isMenuOpen);
    
    
    const handleClickOutside = (event) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)){
            dispatch(closePlaylistMenuContext())
        }
    };

    const handleAddToPlaylist = async () => {
        let result = await getPlaylist(playlist.slug);
        result = result.data.music
        result.forEach(element => {
            element.key = element._id
            delete element._id
            element.id = randomId(10)
        });

        const prevPl = JSON.parse(localStorage.getItem("queuePlaylist")) || []
        const newPl = [
            ...prevPl,
            ...result
        ]

        if(result.length > 0){
            localStorage.setItem('queuePlaylist', JSON.stringify(newPl));
            dispatch(closePlaylistMenuContext());
            dispatch(loadPl());
        }else{
            messageApi.error("Playlist rỗng", 1.5)
        }
    };
    

    const handleDeletePlaylist = async () => {
        const result = await deletePlaylist(playlist._id)
        
        if(result.status === "success"){
            onPlChange()
            dispatch(closePlaylistMenuContext())
        }else{
            messageApi.error(result.message)
        }
    }

    const handleEditPlaylist = async () => {
        dispatch(closePlaylistMenuContext())
        dispatch(openModalEditPlaylist())
    }

    const handleCopy = async (slug) => {
        const url = `http://localhost:3000/playlist/${slug}`;
        
        try {
            await navigator.clipboard.writeText(url);
            messageApi.success("Sao chép liên kết thành công")
        } catch (err) {
            messageApi.success("Xảy ra lỗi")
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    // eslint-disable-next-line
    }, []);

    // Tính toán vị trí menu
    const menuStyles = () => {
        if (!isMenuOpen) return {};

        const { top, left } = menuPosition;
        const menuHeight = 200;
        const windowHeight = window.innerHeight;

        // Tính toán vị trí menu
        let adjustedTop = top + 10;

        if (adjustedTop + menuHeight > windowHeight) {
            adjustedTop = top - menuHeight - 10; // Hiển thị phía trên nếu menu nằm ngoài màn hình dưới
        }

        return {
            position: 'fixed',
            top: adjustedTop,
            left: left + 10,
            zIndex: 1000,
        };
    };

    return (
        isMenuOpen ? (
            <>
                {contextHolder}
                <div
                    ref={contextMenuRef}
                    className="context-menu"
                    style={menuStyles()}
                >
                    <ul style={{color: "white"}}>
                        <li onClick={handleAddToPlaylist}>
                            <i className="fa-regular fa-list-music"></i>
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
                            onClick={() => handleCopy(playlist.slug)}
                        >
                            <i className="fa-solid fa-link"></i>
                            <button>Sao chép liên kết</button>
                        </li>
                    </ul>
                </div>
            </>
        ) : null
    );
};