import { useSelector } from 'react-redux';
import AlbumContextMenu from './Album';
import './ContextMenu.css';
import { message } from 'antd';
// import MusicInPlContextMenu from './MusicInPl';
import PlaylistContextMenu from './Playlist';
import MusicContextMenu from './Music';

export default function ContextMenu(){
    const [messageApi, contextHolder] = message.useMessage();

    const albumContextMenu = useSelector(state => state.albumContextMenuReducer);
    const playlistContextMenu = useSelector(state => state.playlistContextMenuReducer)
    const musicContextMenu = useSelector(state => state.musicContextMenuReducer)
    const user = useSelector(state => state.loginReducer)
    const playlistProp = useSelector(state => state.savePlReducer)

    return (
        <>
            {contextHolder}
            {albumContextMenu?.albumOpen ? 
                <AlbumContextMenu 
                    menuPosition={albumContextMenu.data?.menuPosition}
                    album={albumContextMenu.data?.album} 
                    messageApi={messageApi}
                    user={user.value}
                /> : 
                null
            }
            {/* <MusicInPlContextMenu /> */}
            {playlistContextMenu?.playlistOpen ? 
                <PlaylistContextMenu 
                    menuPosition={playlistContextMenu.data?.menuPosition}
                    playlist={playlistContextMenu.data?.playlist}
                /> :
                null
            }
            {musicContextMenu?.musicOpen ? 
                <MusicContextMenu
                    menuPosition={musicContextMenu.data?.menuPosition}
                    music={musicContextMenu.data?.music}
                    messageApi={messageApi}
                    playlist={playlistProp}
                    user={user.value}
                /> :
                null
            }
        </>
    )
}