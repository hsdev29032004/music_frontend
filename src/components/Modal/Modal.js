import CreatePlaylist from './CreatePlaylist';
// import ChangePassword from './ChangePassword';
import './Modal.css';
import EditAlbum from './EditAlbum';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import EditPlaylist from './EditPlaylist'
import EditMusic from './EditMusic';
// import InfoUser from './InfoUser'

export default function Modal(){
    const { isEditAlbumOpen, isCreatePlaylistOpen, isEditPlaylistOpen, isEditMusicOpen } = useSelector(state => state.modalReducer)    

    const [messageApi, contextHolder] = message.useMessage()
    return (
        <>
            {contextHolder}
            {/* <ChangePassword /> */}
            {isCreatePlaylistOpen ? <CreatePlaylist /> : null}
            {isEditAlbumOpen ? <EditAlbum messageApi={messageApi}/> : null}
            {isEditPlaylistOpen ? <EditPlaylist /> : null}
            {/* <InfoUser /> */}
            {isEditMusicOpen ? <EditMusic messageApi={messageApi} /> : null}
        </>
    )
}