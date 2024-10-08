import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getOneAlbum } from "../../services/album";
import { Empty, message } from "antd";
import Detail from "../../components/Detail/Detail";
import { useSelector } from "react-redux";
import Music from "../../components/Music/Music";
import NotFound from "../NotFound/NotFound.js";
import { Helmet } from "react-helmet-async";
import SkeletonDetailAlbum from "../../components/Skeleton/DetailAlbum.js";

export default function Album({ title }) {
    const [messageApi, contextHolder] = message.useMessage()

    const [album, setAlbum] = useState(null)
    const { slug } = useParams("slug")

    const [loading, setLoading] = useState(true)

    const user = useSelector(state => state.loginReducer).value

    useEffect(() => {
        const fetchAlbum = async () => {
            setLoading(true)
            const result = await getOneAlbum(slug)
            setAlbum(result.data)
            setLoading(false)
        }

        // setTimeout(() => {
            fetchAlbum()
        // }, 3000);
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {contextHolder}
            {loading ? (
                <SkeletonDetailAlbum />
            ) : (
                album ? (
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-12 col-12">
                            <Detail data={album} user={user} messageApi={messageApi} type="ALBUM" />
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-12 col-12">
                            {album.infoMusic?.length > 0 ? (
                                <div className="music-container">
                                    <div className="d-flex" style={{ flexWrap: "wrap" }}>
                                        {album.infoMusic.map((value, key) => (
                                            <div className="col-12" key={key}>
                                                <Music
                                                    data={value}
                                                    likedMusic={user.likedMusic}
                                                    userId={user._id}
                                                    showLike
                                                />
                                                <div className="ml-2 mr-2" style={{ borderBottom: "1px solid #292929" }}></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Empty description="Album rỗng" />
                            )}
                        </div>
                    </div>
                ) : (
                    <NotFound />
                )
            )}
        </>
    )
}