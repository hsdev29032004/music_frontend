import React, { useRef, useEffect } from 'react';
import './ContextMenu.css';
import { useDispatch, useSelector } from "react-redux"
import { closeMusicInPlMenuContext } from '../../actions/menuContext';
import { loadPl } from "../../actions/loadPl"
import { message } from 'antd';
import { openModalCreatePlaylist } from '../../actions/modal';
import { addToPlaylist } from '../../services/music';

export default function MusicInPlContextMenu({ menuPosition, musicKey, onNext }){    
    const [messageApi, contextHolder] = message.useMessage();
    const contextMenuRef = useRef(null);
    const dispatch = useDispatch()

    const isMenuOpen = useSelector(state => state.musicInPlContextMenuReducer.musicInPlOpen) 
    const playlist = useSelector(state => state.savePlReducer)

    const handleClickOutside = (event) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
            dispatch(closeMusicInPlMenuContext())
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

        const { top, left } = menuPosition ;
        const windowWidth = window.innerWidth;

        return {
            position: 'fixed',
            top: top,
            right: windowWidth - left + 10,
            zIndex: 1000,
        };
    };

    const handleDeleteMIP = () => {
        if((JSON.parse(localStorage.getItem("queuePlaylist")).length > 1)){  
            const savedPlaylist = JSON.parse(localStorage.getItem("queuePlaylist"))
            const filterMIP = savedPlaylist.filter(music => music.id !== musicKey)
            localStorage.setItem("queuePlaylist", JSON.stringify(filterMIP)) 
            if(musicKey === localStorage.getItem("currentId")){
                onNext()
            }
        }else if((JSON.parse(localStorage.getItem("queuePlaylist")).length) === 1){                        
            localStorage.removeItem("queuePlaylist")
            localStorage.removeItem("currentId")
        }
        dispatch(loadPl())
        dispatch(closeMusicInPlMenuContext())
    }

    const handleCopyMIP = async () => {
        const slug = JSON.parse(localStorage.getItem("queuePlaylist")).find(item => item.id === musicKey).slug        
        const link = window.location.host + `/music/${slug}`
        try {
            await navigator.clipboard.writeText(link);
            messageApi.success("Sao chép liên kết thành công")
        } catch (err) {
            messageApi.success("Xảy ra lỗi")
        }
    }

    const handleMove = (type) => {
        let playlist = JSON.parse(localStorage.getItem("queuePlaylist"))
        const index = playlist.findIndex(item => item.id === musicKey)
        const [removeItem] = playlist.splice(index, 1)
        if(type === "DOWN"){
            playlist.push(removeItem)
        }else if(type === "UP"){
            playlist.unshift(removeItem)
        }
        localStorage.setItem("queuePlaylist", JSON.stringify(playlist))
        dispatch(loadPl())
        dispatch(closeMusicInPlMenuContext())
    }

    const handleAddPl = () => {
        dispatch(closeMusicInPlMenuContext())
        dispatch(openModalCreatePlaylist())
    }

    const handleAddMusicToPl = async (playlistId) => {
        const musicId = (JSON.parse(localStorage.getItem("queuePlaylist"))).find(item => item.id === musicKey).key
        const result = await addToPlaylist({musicId, playlistId})
        messageApi[result.status](result.msg)
    }

    return (
        isMenuOpen ? (
            <>
                {contextHolder}
                <div
                    ref={contextMenuRef}
                    className="context-menu"
                    style={menuStyles()}
                >
                    <ul style={{ color: "white" }}>
                        <li className='add-to-pl'>
                            <i className="fa-regular fa-list-music"></i>
                            <button>Thêm vào playlist</button>
                            <i className="fa-light fa-angle-right"></i>
                            <div className='submenu'>
                                <div onClick={handleAddPl} className="dflex-aj-center" style={{color: 'white', padding: "5px 10px", borderBottom: "1px solid #3f3f3f"}}>
                                    <i className="fa-regular fa-circle-plus mr-2"></i>
                                    <p>Tạo playlist mới</p>
                                </div>
                                <ul>
                                    {playlist && playlist.length > 0 ? (
                                        playlist.map((value, key) => (
                                            <li key={key} onClick={() => handleAddMusicToPl(value._id)}>{value.name}</li>
                                        ))
                                    ) : (
                                        <p style={{color: "#717171", textAlign: "center"}}>Không có playlist nào</p>
                                    )}
                                </ul>
                            </div>
                        </li>
                        <li onClick={() => handleMove("UP")}>
                            <i className="fa-solid fa-up"></i>
                            <button>Chuyển lên đầu</button>
                        </li>
                        <li onClick={() => handleMove("DOWN")}>
                            <i className="fa-solid fa-down"></i>
                            <button>Chuyển xuống cuối</button>
                        </li>
                        <li onClick={handleCopyMIP}>
                            <i className="fa-solid fa-link"></i>
                            <button>Sao chép liên kết</button>
                        </li>
                        <li onClick={handleDeleteMIP}>
                            <i className="fa-solid fa-trash"></i>
                            <button>Xóa</button>
                        </li>
                    </ul>
                </div>
            </>
        ) : null
    );
};
