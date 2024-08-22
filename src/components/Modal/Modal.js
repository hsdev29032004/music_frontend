import CreatePlaylist from './CreatePlaylist';
// import ChangePassword from './ChangePassword';
import './Modal.css';
import EditAlbum from './EditAlbum';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import EditPlaylist from './EditPlaylist'
// import InfoUser from './InfoUser'

export default function Modal(){
    const isEditAlbumOpen = useSelector(state => state.modalReducer.isEditAlbumOpen)
    const isCreatePlaylistOpen = useSelector(state => state.modalReducer.isCreatePlaylistOpen)
    const isEditPlaylistOpen = useSelector(state => state.modalReducer.isEditPlaylistOpen)    

    const [messageApi, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}
            {/* <ChangePassword /> */}
            {isCreatePlaylistOpen ? <CreatePlaylist /> : null}
            {isEditAlbumOpen ? <EditAlbum messageApi={messageApi}/> : null}
            {isEditPlaylistOpen ? <EditPlaylist /> : null}
            {/* <InfoUser /> */}
        </>
    )
}