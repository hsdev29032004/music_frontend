import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getAlbumsBySingerId, getSinger } from "../../services/singer";
import "./Singer.css"
import { useDispatch, useSelector } from "react-redux";
import { Empty, message, Spin } from "antd";
import { subcribeSinger } from "../../services/favorite";
import { handleReplaceWaitingList } from "../../helpers/playlist";
import Music from "../../components/Music/Music";
import Album from "../../components/Album/Album";
import { openModalCreateAlbum, openModalCreateMusic } from "../../actions/modal";
import EditSinger from "../../components/Modal/EditSinger";
import { Helmet } from "react-helmet-async";

export default function Singer({ title }) {
    const user = useSelector(state => state.loginReducer).value

    const [singer, setSinger] = useState({})
    const [isSubscribed, setIsSubscribed] = useState(null)
    const [quantitySubcriber, setQuantitySubcriber] = useState(null)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [loading, setLoading] = useState(true)

    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()
    const { slug } = useParams("slug")

    useEffect(() => {
        document.title = title
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setIsSubscribed(user?.subcribedSinger.some(item => item._id === singer?._id))
        setQuantitySubcriber(singer?.quantitySubcriber)
    }, [singer, user])

    useEffect(() => {
        const fetchSinger = async () => {
            setLoading(true)
            const result = await getSinger(slug)
            if (result.data) {
                const album = await getAlbumsBySingerId(result.data?.slug)
                if (album) {
                    result.data.album = album.data
                }
            }
            setSinger(result.data)
            // setTimeout(() => {
                setLoading(false)
            // }, 5000);
        }

        fetchSinger()
        // eslint-disable-next-line
    }, [slug])

    const handleSubcribe = async () => {
        const result = await subcribeSinger(singer?._id, user?._id)
        if (result.status === "like") {
            setIsSubscribed(true)
            setQuantitySubcriber(prev => prev + 1)
            messageApi.success(result.msg)
        } else if (result.status === "unlike") {
            setIsSubscribed(false)
            setQuantitySubcriber(prev => prev - 1)
            messageApi.success(result.msg)
        } else {
            messageApi.error(result.msg)
        }
    }

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {contextHolder}
            {openModalEdit ? <EditSinger singer={singer} messageApi={messageApi} setOpenModalEdit={setOpenModalEdit} /> : null}
            {loading ? (
                <div style={{ textAlign: "center" }}>
                    <Spin />
                </div>
            ) : (
                singer ? (
                    <>
                        <div className="singer-hero">
                            <div className="inner-image">
                                <img src={singer.avatar} alt="" />
                                <div className="tippy">
                                    <i onClick={() => handleReplaceWaitingList(singer, dispatch, messageApi, "SINGER")} className="fa-solid fa-triangle border-white"></i>
                                </div>
                            </div>
                            <div>
                                <div className="dflex-a-center">
                                    <h2 className="fw-800 mb-2" style={{ fontSize: "50px" }}>{singer.fullName}</h2>
                                    {user?.level === 3 &&
                                        <i
                                            onClick={() => setOpenModalEdit(true)}
                                            className="fa-solid fa-pen-to-square ml-2"
                                            style={{ backgroundColor: "#984bdc", borderRadius: "50%", padding: "10px", cursor: "pointer" }}
                                        >
                                        </i>
                                    }
                                </div>
                                <div className="dflex-a-center">
                                    <div style={{ fontSize: "13px", color: "#717171", fontWeight: 600 }}>
                                        {quantitySubcriber?.toLocaleString('vi-VN')} quan tâm
                                    </div>
                                    <div onClick={handleSubcribe} className={`${isSubscribed ? "btn-white" : "btn-purple"} text-center d-inline mb-2 mt-2 ml-2 pt-1 pb-1`} style={{ fontSize: "13px", cursor: "pointer" }}>{isSubscribed ? "Bỏ quan tâm" : "Quan tâm"}</div>
                                </div>
                            </div>
                        </div>
                        {singer.infoMusic?.length > 0 ? (
                            <div className="music-container mt-5">
                                <h4 className="mb-2 pl-3 dflex-a-center">
                                    Bài hát
                                    {user?.level === 3 &&
                                        <i
                                            onClick={() => dispatch(openModalCreateMusic({ fullName: singer.fullName, _id: singer._id, slug: singer.slug }))}
                                            className="fa-sharp fa-solid fa-plus ml-2 dflex-a-center"
                                            style={{ fontSize: "11px", padding: "3px 5px", borderRadius: "50%", cursor: "pointer", backgroundColor: "#984bdc" }}
                                        >
                                        </i>
                                    }
                                </h4>
                                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                                    {singer.infoMusic.slice(0, 6).map((value, key) => (
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={key}>
                                            <Music
                                                data={value}
                                                likedMusic={user?.likedMusic}
                                                userId={user?._id}
                                                showMore
                                            />
                                            <div className="ml-2 mr-2" style={{ borderBottom: "1px solid #292929" }}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="music-container mt-5">
                                <h4 className="mb-2 pl-3 dflex-a-center">
                                    Bài hát
                                    {user?.level === 3 &&
                                        <i
                                            onClick={() => dispatch(openModalCreateMusic({ fullName: singer.fullName, _id: singer._id, slug: singer.slug }))}
                                            className="fa-sharp fa-solid fa-plus ml-2 dflex-a-center"
                                            style={{ fontSize: "11px", padding: "3px 5px", borderRadius: "50%", cursor: "pointer", backgroundColor: "#984bdc" }}
                                        >
                                        </i>
                                    }
                                </h4>
                                <Empty description="Không có bài hát nào" />
                            </div>
                        )}
                        {singer.album?.length > 0 ? (
                            <div className="album-container mt-4">
                                <h4 className="mb-2 pl-3 dflex-a-center">
                                    Album
                                    {user?.level === 3 &&
                                        <i
                                            onClick={() => dispatch(openModalCreateAlbum(singer))}
                                            className="fa-sharp fa-solid fa-plus ml-2 dflex-a-center"
                                            style={{ fontSize: "11px", padding: "3px 5px", borderRadius: "50%", cursor: "pointer", backgroundColor: "#984bdc" }}
                                        >
                                        </i>
                                    }
                                </h4>
                                <div className="d-flex inner-album-container">
                                    {singer.album.slice(0, 6).map((value, key) => (
                                        <div className="album-item col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6" key={key}>
                                            <Album messageApi={messageApi} value={value} user={user} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="album-container mt-4">
                                <h4 className="mb-2 pl-3 dflex-a-center">
                                    Album
                                    {user?.level === 3 &&
                                        <i
                                            onClick={() => dispatch(openModalCreateAlbum(singer))}
                                            className="fa-sharp fa-solid fa-plus ml-2 dflex-a-center"
                                            style={{ fontSize: "11px", padding: "3px 5px", borderRadius: "50%", cursor: "pointer", backgroundColor: "#984bdc" }}
                                        >
                                        </i>
                                    }
                                </h4>
                                <Empty description="Không có album nào" />
                            </div>
                        )}
                        {singer.description && (
                            <div className="description-container mt-4">
                                <h4 className="mb-2 pl-3">Về {singer.fullName}</h4>
                                <div className="row inner-description-container">
                                    <div className="inner-image col-xl-6 col-lg-6 col-md-6 col-sm-12" style={{ aspectRatio: "5/3", overflow: "hidden" }}>
                                        <img style={{ width: "100%", objectFit: "cover" }} src={singer.avatar} alt="" />
                                    </div>
                                    <div
                                        className="inner-image fw-600 col-xl-6 col-lg-6 col-md-6 col-sm-12"
                                        style={{ aspectRatio: "5/3", overflow: "auto", color: "#8f8f8f", fontSize: "15px", margin: "10px 0" }}
                                    >
                                        {singer.description.split('\n').map((line, index) => (
                                            <span key={index}>
                                                {line}
                                                <br />
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <Empty description="Không tồn tại ca sĩ" />
                )
            )}
        </>
    )
}