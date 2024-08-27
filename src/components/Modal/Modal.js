import './Modal.css';
import CreatePlaylist from './CreatePlaylist';
import EditAlbum from './EditAlbum';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import EditPlaylist from './EditPlaylist'
import EditMusic from './EditMusic';
import CreateMusic from './CreateMusic';
import CreateAlbum from './CreateAlbum';

export default function Modal(){
    const { 
        isEditAlbumOpen, 
        isCreatePlaylistOpen, 
        isEditPlaylistOpen, 
        isEditMusicOpen, 
        isCreateMusicOpen, 
        isCreateAlbumOpen, 
        data 
    } = useSelector(state => state.modalReducer)
    
    const [messageApi, contextHolder] = message.useMessage()
    return (
        <>
            {contextHolder}
            {isCreatePlaylistOpen ? <CreatePlaylist /> : null}
            {isEditAlbumOpen ? <EditAlbum messageApi={messageApi}/> : null}
            {isEditPlaylistOpen ? <EditPlaylist /> : null}
            {isEditMusicOpen ? <EditMusic messageApi={messageApi} /> : null}
            {isCreateMusicOpen ? <CreateMusic messageApi={messageApi} singer={data}/> : null}
            {isCreateAlbumOpen ? <CreateAlbum messageApi={messageApi} singer={data} /> : null}
        </>
    )
}