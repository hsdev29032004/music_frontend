import { useEffect, useState } from "react";
import "./Discover.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { handleAddMusicToWaitingList } from "../../helpers/playlist";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import ShortMusic from "../../components/Music/ShortMusic"
import Album from "../../components/Album/Album";
import { getListAlbum } from "../../services/album";
import { getListMusic } from "../../services/music";
import { getListSinger } from "../../services/singer";
import { getListMusicType } from "../../services/musicType";
import Singer from "../../components/Singer/Singer";
import { Link } from "react-router-dom";

export default function Discover({ title }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [currentIndex, setCurrentIndex] = useState(0); // Đặt giá trị ban đầu là 0
    const [initAlbum, setInitAlbum] = useState([])
    const [initMusic, setInitMusic] = useState([])
    const [initSinger, setInitSinger] = useState([])
    const [initMusicType, setInitMusicType] = useState([])
    const dispatch = useDispatch();

    const user = useSelector(state => state.loginReducer).value
    const {albumChange: reloadAlbum} = useSelector(state => state.reloadReducer)
        
    useEffect(() => {
        document.title = title;
        // eslint-disable-next-line
    }, [title]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % arr.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + arr.length) % arr.length);
    };

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
            const result = await getListAlbum()
            setInitAlbum(result.data)
       }
       fetchAlbum()
    }, [reloadAlbum])

    useEffect(() => {
        const fetchMusic = async () => {
            const result = await getListMusic()
            setInitMusic(result.data)
        }
        fetchMusic()
    }, [])

    useEffect(() => {
        const fetchSinger = async () => {
            const result = await getListSinger()
            setInitSinger(result.data)
        }
        fetchSinger()
    }, [])

    useEffect(() => {
        const fetchMusicType = async () => {
            const result = await getListMusicType()
            setInitMusicType(result.data)
        }
        fetchMusicType()
    }, [])
    
    const arr = [
        "active active active",
        "last prev prev",
        "next next first"
    ];

    return (
        <>
            {contextHolder}
            <div className="d-flex top-container">
                <LeftOutlined onClick={handlePrevious} />
                {initTopMusic.map((value, key) => (
                    <div
                        key={key}
                        className={`inner-image col-xl-4 col-lg-4 col-md-6 col-sm-12 ${arr[currentIndex % arr.length].split(' ')[key]}`}
                    >
                        <img onClick={() => handleAddMusicToWaitingList(value, dispatch)} src={value.avatar} alt="" />
                    </div>
                ))}
                <RightOutlined onClick={handleNext} />
            </div>

            <div className="music-container mt-5">
                <h4 className="mb-2 pl-3">Có thể bạn thích nghe</h4>
                <div className="d-flex" style={{flexWrap: "wrap"}}>
                    {initMusic && initMusic.length > 0 && initMusic.slice(0, 9).map((value, key) => (
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12" key={key}>
                            <ShortMusic
                                musicKey={value._id}
                                active={value.id === localStorage.getItem("currentId") || ""}
                                data={value}
                            />
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="album-container mt-4">
                <h4 className="mb-2 pl-3">Album gợi ý</h4>
                <div className="d-flex inner-album-container">
                    {initAlbum && initAlbum.length > 0 && initAlbum.slice(0, 6).map((value, key) => (
                        <div className="album-item col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6" key={key}>
                            <Album messageApi={messageApi} value={value} user={user} />
                        </div>
                    ))}
                </div>
            </div>

            
            <div className="musicType-container mt-4">
                <h4 className="mb-2 pl-3">Thể loại</h4>
                <div className="d-flex inner-musicType-container" style={{flexWrap: "nowrap", overflowX: "auto"}}>
                    {initMusicType && initMusicType.length > 0 && initMusicType.map((value, key) => (
                        <Link to={`music-type/${value.slug}`} className="musicType-item col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12" key={key}>
                            <div className="inner-image">
                                <img alt="" src={value.avatar} />
                                <div className="tippy">
                                    <i /*onClick={() => handleReplaceWaitingList(value, dispatch, messageApi, "SINGER")}*/ className="fa-solid fa-triangle border-white"></i>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className="singer-container mt-4">
                <h4 className="mb-2 pl-3">Ca sĩ nổi bật</h4>
                <div className="d-flex inner-singer-container" style={{flexWrap: "nowrap", overflowX: "auto"}}>
                    {initSinger && initSinger.length > 0 && initSinger.slice(0, 10).map((value, key) => (
                        <div className="singer-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6" key={key}>
                            <Singer value={value} messageApi={messageApi}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}