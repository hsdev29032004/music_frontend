import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Empty, message } from "antd";
import Detail from "../../components/Detail/Detail";
import { useSelector } from "react-redux";
import Music from "../../components/Music/Music";
import { getPlaylist } from "../../services/playlist";
import NotFound from "../NotFound/NotFound.js";

export default function Playlist({ title }) {
    const [messageApi, contextHolder] = message.useMessage()

    const [playlist, setPlaylist] = useState(null)
    const { slug } = useParams("slug")

    const user = useSelector(state => state.loginReducer).value

    useEffect(() => {
        document.title = title
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const fetchPlaylist = async () => {
            const result = await getPlaylist(slug)
            setPlaylist(result.data)
        }

        fetchPlaylist()
        // eslint-disable-next-line
    }, [slug])

    return (
        <>
            {contextHolder}
            {playlist ? (
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-12 col-12">
                        <Detail data={playlist} user={user} messageApi={messageApi} type="PLAYLIST" />
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-12 col-12">
                        {playlist.music?.length > 0 ? (
                            <div className="music-container">
                                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                                    {playlist.music.map((value, key) => (
                                        <div className="col-12" key={key}>
                                            <Music
                                                data={value}
                                                likedMusic={user.likedMusic}
                                                userId={user._id}
                                                showLike
                                                showDelete={playlist._id}
                                            />
                                            <div className="ml-2 mr-2" style={{ borderBottom: "1px solid #292929" }}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Empty description="Playlist rỗng" />
                        )}
                    </div>
                </div>
            ) : (
                <NotFound />
            )}
        </>
    )
}