import { useDispatch, useSelector } from "react-redux"
import { Empty, message, Tabs, Typography } from 'antd';
import { Link } from "react-router-dom"
import Singer from "../../components/Singer/Singer";
import Music from "../../components/Music/Music";
import Album from "../../components/Album/Album";
import "./Library.css"
import { openModalCreatePlaylist } from "../../actions/modal";
import { closePlaylistMenuContext, openPlaylistMenuContext } from "../../actions/menuContext";
import { deletePlaylist } from "../../services/playlist";
import { reloadPlaylist } from '../../actions/reload';
import { handleReplaceWaitingList } from "../../helpers/playlist";
import { Helmet } from "react-helmet-async";

export default function Library({ title }) {
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()

    const user = useSelector(state => state.loginReducer).value
    const playlist = useSelector(state => state.savePlReducer)
    
    const handleOpenMenu = (event, playlist) => {                    
        event.preventDefault();
        event.stopPropagation(); // Thêm để hiển thị menucontext
        
        const { clientX: left, clientY: top } = event;
                    
        dispatch(openPlaylistMenuContext({playlist: playlist, menuPosition: {top, left}}))
    };

    const handleDeletePlaylist = async (value) => {
        const result = await deletePlaylist(value?._id)
        
        if(result.status === "success"){
            dispatch(reloadPlaylist())
            dispatch(closePlaylistMenuContext())
        }else{
            messageApi.error(result.message)
        }
    }

    if (user?.level === 0) {
        return (
            <>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{ height: 60 }}
                    description={
                        <Typography.Text style={{color: "white"}}>
                        Bạn chưa <Link to="/login">đăng nhập</Link>
                        </Typography.Text>
                    }
                >
                </Empty>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {contextHolder}
            <h4 className="mb-2 pl-3">Thư viện</h4>
            {user?.subcribedSinger.length > 0 && (
                <div className="singer-container mt-4">
                    <div className="d-flex inner-singer-container" style={{flexWrap: "nowrap", overflowX: "auto"}}>
                        {user.subcribedSinger.map((value, key) => (
                            <div className="singer-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6 d-flex" style={{flexDirection: "column", alignItems: "center"}} key={key}>
                                <Singer value={value} messageApi={messageApi} user={user}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <Tabs 
                style={{color: "white"}}
                defaultActiveKey="1" 
                items={[
                    {
                        key: "1",
                        label: "Bài hát",
                        children: user?.likedMusic.length > 0 ? (
                            <div className="music-container">
                                <div className="d-flex" style={{flexWrap: "wrap"}}>
                                    {user.likedMusic.map((value, key) => (
                                        <div className="col-12" key={key}>
                                            <Music
                                                data={value}
                                                likedMusic={user.likedMusic}
                                                userId={user._id}
                                                showLike
                                            />
                                            <div className="ml-2 mr-2" style={{borderBottom: "1px solid #292929"}}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Empty description="Không có bài hát yêu thích" />
                        )
                    }, {
                        key: "2",
                        label: "Album",
                        children: user?.likedAlbum.length > 0 ? (
                            <div className="album-container mt-4">
                                <div className="d-flex inner-album-container">
                                    {user.likedAlbum.map((value, key) => (
                                        <div className="album-item col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6" key={key}>
                                            <Album messageApi={messageApi} value={value} user={user} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Empty description="Không có album yêu thích"/>   
                        )
                    }, {
                        key: "3",
                        label: "Playlist",
                        children: playlist?.length > 0 ? (
                            <div className="album-container mt-4">
                                <div className="d-flex inner-album-container">
                                    <div className="album-item col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6" >
                                        <div 
                                            className="dflex-aj-center" 
                                            style={{backgroundColor: "#292929", borderRadius: "10px", cursor: "pointer", aspectRatio: '1/1'}}
                                            onClick={() => dispatch(openModalCreatePlaylist())}
                                        >
                                            Thêm
                                        </div>
                                    </div>
                                    {playlist.map((value, key) => (
                                        <div className="album-item col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6" key={key}>
                                            <div className="inner-image">
                                                <img src={value.avatar} alt="" />
                                                <div className="tippy">
                                                    <i onClick={() => handleDeletePlaylist(value)} className="fa-solid fa-trash-can"></i>
                                                    <i onClick={() => handleReplaceWaitingList(value, dispatch, messageApi, "PLAYLIST")} className="fa-solid fa-triangle border-white"></i>
                                                    <i onClick={(event) => handleOpenMenu(event, value)} className="fa-solid fa-ellipsis"></i>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-center">
                                                <Link to={`/playlist/${value.slug}`} className="ellipsis">
                                                    <h3 className='album-link'>{value.name}</h3>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Empty description={
                                <div>
                                    Không có playlist
                                    <span onClick={() => dispatch(openModalCreatePlaylist())} style={{color: "blue", cursor: "pointer"}}> tạo ngay</span>
                                </div>} 
                            />
                        )
                    }
                ]}
            />
        </>
    )
}