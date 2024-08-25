import { useRef, useEffect } from 'react';
import { useDispatch } from "react-redux"
import { closeMusicMenuContext } from '../../actions/menuContext';
import { openModalCreatePlaylist, openModalEditMusic } from '../../actions/modal';
import { addToPlaylist } from '../../services/music';
import { handleCopy } from '../../helpers/copy';
import { handleAddMusicToWaitingList } from '../../helpers/playlist';

export default function MusicContextMenu({ menuPosition, playlist, messageApi, music, user }) {
    const contextMenuRef = useRef(null);
    const dispatch = useDispatch()

    const handleClickOutside = (event) => {        
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {            
            dispatch(closeMusicMenuContext())
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
        // eslint-disable-next-line
    }, []);

    const menuStyles = () => {
        const menuHeight = user?.level === 3 ? 240 : 160;
        const { top, left } = menuPosition;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let adjustedTop = top + 10;
        if (adjustedTop + menuHeight > windowHeight) {
            adjustedTop = top - menuHeight;
        }

        return {
            position: 'fixed',
            top: adjustedTop,
            right: windowWidth - left + 10,
            zIndex: 1000,
        };
    };

    const handleAddPl = () => {
        dispatch(closeMusicMenuContext())
        dispatch(openModalCreatePlaylist())
    }

    const handleAddMusicToPl = async (musicId, playlistId) => {
        const result = await addToPlaylist({ musicId, playlistId })
        messageApi[result.status](result.msg)
    }

    return (
        <>
            <div
                ref={contextMenuRef}
                className="context-menu"
                style={menuStyles()}
            >
                <ul style={{ color: "white" }}>
                    <li onClick={() => handleAddMusicToWaitingList(music, dispatch)}>
                        <i className="fa-solid fa-play"></i>
                        <button>Thêm vào danh sách phát</button>
                    </li>
                    <li className='add-to-pl'>
                        <i className="fa-regular fa-list-music"></i>
                        <button>Thêm vào playlist</button>
                        <i className="fa-light fa-angle-right"></i>
                        <div className='submenu'>
                            <div onClick={handleAddPl} className="dflex-aj-center" style={{ color: 'white', padding: "5px 10px", borderBottom: "1px solid #3f3f3f" }}>
                                <i className="fa-regular fa-circle-plus mr-2"></i>
                                <p>Tạo playlist mới</p>
                            </div>
                            <ul>
                                {playlist && playlist.length > 0 ? (
                                    playlist.map((value, key) => (
                                        <li onClick={() => handleAddMusicToPl(music._id, value._id)} key={key}>{value.name}</li>
                                    ))
                                ) : (
                                    <p style={{ color: "#717171", textAlign: "center" }}>Không có playlist nào</p>
                                )}
                            </ul>
                        </div>
                    </li>
                    <li onClick={() => handleCopy(`http://localhost:3000/music/${music.slug}`, messageApi)}>
                        <i className="fa-solid fa-link"></i>
                        <button>Sao chép liên kết</button>
                    </li>
                    {user.level === 3 && 
                        <>
                            <li onClick={() => dispatch(openModalEditMusic())}>
                                <i className="fa-solid fa-pen"></i>
                                <button>Chỉnh sửa bài hát</button>
                            </li>
                            <li onClick={() => messageApi.error("Chức năng không được test")}>
                                <i className="fa-solid fa-trash"></i>
                                <button>Xóa bài hát</button>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </>
    );
};
