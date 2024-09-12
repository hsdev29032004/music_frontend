import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getListMusic } from "../../services/music";
import Music from "../../components/Music/Music";
import { useSelector } from "react-redux";
import { getListAlbum } from "../../services/album";
import { Empty, message } from "antd";
import Album from "../../components/Album/Album";
import { getListSinger } from "../../services/singer";
import Singer from "../../components/Singer/Singer";
import { getListMusicType } from "../../services/musicType";
import { Helmet } from "react-helmet-async";

export default function Search({title}){
    const [music, setMusic] = useState([])
    const [album, setAlbum] = useState([])
    const [singer, setSinger] = useState([])
    const [musicType, setMusicType] = useState([])

    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');  
    const [messageApi, contextHolder] = message.useMessage();
    
    const user = useSelector(state => state.loginReducer).value

    useEffect(() => {
        const inputSearch = document.querySelector("#input-search")
        inputSearch.value = keyword
        // eslint-disable-next-line
    }, [searchParams]);

    // Bài hát, album, ca sĩ
    useEffect(() => {
        const fetchMusic = async () => {
            const result = await getListMusic(keyword)
            setMusic(result.data);
        }
        fetchMusic()
    }, [keyword])

    useEffect(() => {
        const fetchAlbum = async () => {
            const result = await getListAlbum(keyword)
            setAlbum(result.data);
        }
        fetchAlbum()
    }, [keyword])

    useEffect(() => {
        const fetchSinger = async () => {
            const result = await getListSinger(keyword)
            setSinger(result.data);
        }
        fetchSinger()
    }, [keyword])

    useEffect(() => {
        const fetchMusicType = async () => {
            const result = await getListMusicType()
            setMusicType(result.data)
        }
        fetchMusicType()
    }, [])
    
    return(
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {contextHolder}
            <h3 className="fw-700">Kết quả tìm kiếm</h3>

            {(music.length !== 0 || album.length !== 0 || singer.length !== 0) &&
                <div className="musicType-container mt-4">
                    <h4 className="mb-2 pl-3">Thể loại</h4>
                    <div className="d-flex inner-musicType-container" style={{flexWrap: "nowrap", overflowX: "auto"}}>
                        {musicType.map((value, key) => (
                            <div onClick={() => messageApi.warning("Comming soon")} className="musicType-item col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12" key={key}>
                                <div className="inner-image">
                                    <img alt="" src={value.avatar} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }

            {music.length > 0 &&
                <div className="music-container mt-4">
                    <h4 className="mb-2 pl-3">Bài hát</h4>
                    <div className="d-flex" style={{flexWrap: "wrap"}}>
                        {music?.slice(0, 6).map((value) => (
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" key={value?._id}>
                                <Music
                                    data={value}
                                    likedMusic={user?.likedMusic}
                                    userId={user?._id}
                                    showMore
                                />
                            </div>
                        ))}
                    </div>
                </div>
            }

            {album.length > 0 &&
                <div className="album-container mt-4">
                    <h4 className="mb-2 pl-3 fw-700" style={{fontSize: "21px"}}>Album</h4>
                    <div className="d-flex inner-album-container">
                        {album?.slice(0, 6).map((value) => (
                            <div className="album-item col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6" key={value._id}>
                                <Album messageApi={messageApi} value={value} user={user} />
                            </div>
                        ))}
                    </div>
                </div>
            }

            {singer.length > 0 &&
                <div className="singer-container mt-4">
                    <h4 className="mb-2 pl-3">Ca sĩ nổi bật</h4>
                    <div className="d-flex inner-singer-container" style={{flexWrap: "nowrap", overflowX: "auto"}}>
                        {singer.slice(0, 10).map((value, key) => (
                            <div className="singer-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6 d-flex" style={{flexDirection: "column", alignItems: "center"}} key={key}>
                                <Singer value={value} messageApi={messageApi} user={user}/>
                            </div>
                        ))}
                    </div>
                </div>
            }

            {music.length === 0 && album.length === 0 && singer.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Không có kết quả phù hợp"}/>}
        </>
    )
}