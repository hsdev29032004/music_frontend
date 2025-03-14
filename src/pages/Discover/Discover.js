import { useEffect, useState } from "react";
import "./Discover.css";
import { DotChartOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { handleAddMusicToWaitingList } from "../../helpers/playlist";
import { useDispatch, useSelector } from "react-redux";
import { message, Skeleton } from "antd";
import Album from "../../components/Album/Album";
import { getListAlbum } from "../../services/album";
import { getListMusic } from "../../services/music";
import { getListSinger } from "../../services/singer";
import { getListMusicType } from "../../services/musicType";
import Singer from "../../components/Singer/Singer";
import Music from "../../components/Music/Music";
import { Helmet } from "react-helmet-async";
import SkeletonMusic from "../../components/Skeleton/Music";
import SkeletonAlbum from "../../components/Skeleton/Album";

export default function Discover({ title }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [currentIndex, setCurrentIndex] = useState(0); // Đặt giá trị ban đầu là 0

    const [state, setState] = useState({
        initAlbum: [],
        initMusic: [],
        initSinger: [],
        initMusicType: [],
        loadingAlbum: true,
        loadingMusic: true,
        loadingMusicType: true,
    });

    const dispatch = useDispatch();


    const user = useSelector(state => state.loginReducer).value
    const { albumChange: reloadAlbum } = useSelector(state => state.reloadReducer)

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % arr.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + arr.length) % arr.length);
    };

    const comingSoon = () => {
        messageApi.warning("Coming soon")
    }

    const initTopMusic = [
        {
            avatar: "http://res.cloudinary.com/dfjft1zvv/image/upload/v1723456820/images/gqdyjxgfu08marrkje0c.jpg",
            key: "66b9dd427b9711e0202eb794",
            name: "Mưa",
            otherSingersId: [
                {
                    _id: "66b9dccb7b9711e0202eb790",
                    fullName: "Thùy Chi",
                    slug: "thuy-chi-bcxYPFmwT7"
                }
            ],
            premium: true,
            singerId: {
                _id: "66b9db8f7b9711e0202eb78d",
                fullName: "Minh Vương M4U",
                slug: "minh-vuong-m4u-0C2nVbnb2L"
            },
            slug: "mua-s0L2She4MC",
        },
        {
            name: "Khuôn mặt đáng thương",
            slug: "khuon-mat-dang-thuong-7qwTsPsZ4a",
            avatar: "http://res.cloudinary.com/dfjft1zvv/image/upload/v1722306913/images/kiovfci3m1k5p6lufmto.jpg",
            singerId: {
                _id: "66a7b19f902aec43843e17da",
                fullName: "Sơn Tùng",
                slug: "son-tung-ysV2Kjyy5c"
            },
            otherSingersId: [],
            premium: false,
            key: "66a851651c36eabb8d0c84c2",
        },
        {
            name: "Cuối cùng thì",
            slug: "cuoi-cung-thi-VUxdaACM93",
            avatar: "http://res.cloudinary.com/dfjft1zvv/image/upload/v1722307772/images/l5f0h4i9kpeyqeu9ruqy.jpg",
            singerId: {
                _id: "66a7b36ea5474ad07687bf99",
                fullName: "Jack",
                slug: "jack-3NxWwofiVc"
            },
            otherSingersId: [],
            premium: false,
            key: "66a854bf923418ff968042a3",
        }
    ];

    useEffect(() => {
        const fetchAlbum = async () => {
            setState((prev) => ({ ...prev, loadingAlbum: true }));
            const result = await getListAlbum();
            setState((prev) => ({
                ...prev,
                initAlbum: result.data,
                loadingAlbum: false,
            }));
        };
        fetchAlbum();
    }, [reloadAlbum]);

    useEffect(() => {
        const fetchMusic = async () => {
            setState((prev) => ({ ...prev, loadingMusic: true }));
            const result = await getListMusic();
            setState((prev) => ({
                ...prev,
                initMusic: result.data,
                loadingMusic: false,
            }));
        };
        fetchMusic();
    }, []);

    useEffect(() => {
        const fetchSinger = async () => {
            const result = await getListSinger();
            setState((prev) => ({
                ...prev,
                initSinger: result.data,
            }));
        };
        fetchSinger();
    }, []);

    useEffect(() => {
        const fetchMusicType = async () => {
            setState((prev) => ({ ...prev, loadingMusicType: true }));
            const result = await getListMusicType();
            setState((prev) => ({
                ...prev,
                initMusicType: result.data,
                loadingMusicType: false,
            }));
        };
        fetchMusicType();
    }, []);

    const arr = [
        "active active active",
        "last prev prev",
        "next next first"
    ];

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {contextHolder}
            <div className="d-flex top-container">
                <LeftOutlined onClick={handlePrevious} />
                {initTopMusic.map((value, key) => (
                    <div
                        key={key}
                        className={`inner-image col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ${arr[currentIndex % arr.length].split(' ')[key]}`}
                    >
                        <img onClick={() => handleAddMusicToWaitingList(value, dispatch)} src={value.avatar} alt="" />
                    </div>
                ))}
                <RightOutlined onClick={handleNext} />
            </div>

            {state.loadingAlbum ? (
                <div className="album-container">
                    <Skeleton.Input active style={{ backgroundColor: "#292929", marginBottom: "10px" }} className="ml-2 mt-3" />
                    <div className="d-flex inner-album-container">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <SkeletonAlbum key={index} />
                        ))}
                    </div>
                </div>
            ) : (
                Array.isArray(state.initAlbum) && state.initAlbum.length > 0 &&
                <div className="album-container mt-4">
                    <h4 className="mb-2 pl-3">Album gợi ý</h4>
                    <div className="d-flex inner-album-container">
                        {state.initAlbum.slice(0, 6).map((value, key) => (
                            <div className="album-item col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6" key={key}>
                                <Album messageApi={messageApi} value={value} user={user} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {state.loadingMusic ? (
                <div className="music-container">
                    <Skeleton.Input active style={{ backgroundColor: "#292929", marginBottom: "10px" }} className="ml-2 mt-3" />
                    <div className="d-flex" style={{ flexWrap: "wrap" }}>
                        {Array.from({ length: 9 }).map((_, index) => (
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <SkeletonMusic />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                Array.isArray(state.initMusic) && state.initMusic.length > 0 &&
                <div className="music-container mt-4">
                    <h4 className="mb-2 pl-3">Có thể bạn thích nghe</h4>
                    <div className="d-flex" style={{ flexWrap: "wrap" }}>
                        {state.initMusic.slice(0, 9).map((value, key) => (
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12" key={key}>
                                <Music
                                    data={value}
                                    likedMusic={user?.likedMusic}
                                    userId={user?._id}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {state.loadingMusicType ? (
                <div className="album-container">
                    <Skeleton.Input active style={{ backgroundColor: "#292929", marginBottom: "10px" }} className="ml-2 mt-3" />
                    <div className="d-flex inner-musicType-container" style={{ flexWrap: "nowrap", overflowX: "hidden" }}>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div className="musicType-item col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12" key={index}>
                                <Skeleton.Node
                                    active
                                    style={{ width: "100%", backgroundColor: "#292929" }}
                                >
                                    <DotChartOutlined className="d-none" />
                                </Skeleton.Node>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                Array.isArray(state.initMusicType) && state.initMusicType.length > 0 &&
                <div className="musicType-container mt-4">
                    <h4 className="mb-2 pl-3">Thể loại</h4>
                    <div className="d-flex inner-musicType-container" style={{ flexWrap: "nowrap", overflowX: "auto" }}>
                        {state.initMusicType.map((value, key) => (
                            <div onClick={comingSoon} className="musicType-item col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12" key={key}>
                                <div className="inner-image">
                                    <img alt="" src={value.avatar} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {Array.isArray(state.initSinger) && state.initSinger.length > 0 &&
                <div className="singer-container mt-4">
                    <h4 className="mb-2 pl-3">Ca sĩ nổi bật</h4>
                    <div className="d-flex inner-singer-container" style={{ flexWrap: "nowrap", overflowX: "auto" }}>
                        {state.initSinger.slice(0, 10).map((value, key) => (
                            <div className="singer-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6 d-flex" style={{ flexDirection: "column", alignItems: "center" }} key={key}>
                                <Singer value={value} messageApi={messageApi} user={user} />
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}