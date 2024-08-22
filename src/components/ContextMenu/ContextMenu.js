import { useSelector } from 'react-redux';
import AlbumContextMenu from './Album';
import './ContextMenu.css';
import { message } from 'antd';
// import MusicInPlContextMenu from './MusicInPl';
import PlaylistContextMenu from './Playlist';

export default function ContextMenu(){
    const [messageApi, contextHolder] = message.useMessage();

    const albumContextMenu = useSelector(state => state.AlbumContextMenuReducer);
    const playlistContextMenu = useSelector(state => state.playlistContextMenuReducer)

    const user = useSelector(state => state.loginReducer)

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
        </>
    )
}