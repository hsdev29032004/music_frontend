import { useEffect, useState } from "react";
import "./Discover.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { handleAddMusicToWaitingList } from "../../helpers/playlist";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import ShortMusic from "../../components/Music/ShortMusic"
import Album from "../../components/Album/Album";
import AlbumContextMenu from "../../components/ContextMenu/Album";
import EditAlbum from "../../components/Modal/EditAlbum";
import { getListAlbum } from "../../services/album";

export default function Discover({ title }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [currentIndex, setCurrentIndex] = useState(0); // Đặt giá trị ban đầu là 0
    const [initAlbum, setInitAlbum] = useState([])
    const [albumChange, setAlbumChange] = useState(false)
    const dispatch = useDispatch();

    const user = useSelector(state => state.loginReducer).value
    const album = useSelector(state => state.AlbumContextMenuReducer)
        
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
    }, [albumChange])

    const initMusic = [
        {
            _id: "66a854bf923418ff968042a3",
            name: "Cuối cùng thì",
            slug: "cuoi-cung-thi-VUxdaACM93",
            avatar: "http://res.cloudinary.com/dfjft1zvv/image/upload/v1722307772/images/l5f0h4i9kpeyqeu9ruqy.jpg",
            singerId: {
                _id: "66a7b36ea5474ad07687bf99",
                fullName: "Jack",
                slug: "jack-3NxWwofiVc"
            },
            otherSingersId: []
        },
        {
            _id: "66b9d79b7b9711e0202eb78a",
            name: "Đập vỡ cây đàn",
            slug: "dap-vo-cay-dan-u1kFpZ1P6D",
            avatar: "http://res.cloudinary.com/dfjft1zvv/image/upload/v1723455378/images/hvss4yexb7gb0dugpooc.jpg",
            singerId: {
                _id: "66b9d7787b9711e0202eb786",
                fullName: "Quang Lê",
                slug: "quang-le-cdAYsWXuAA"
            },
            otherSingersId: []
        },
        {
            _id: "66a8520a1c36eabb8d0c84c5",
            name: "Em của ngày hôm qua",
            slug: "em-cua-ngay-hom-qua-Cr33ChoaBf",
            avatar: "http://res.cloudinary.com/dfjft1zvv/image/upload/v1722307080/images/pbkh0jm1pbcdre557ahy.jpg",
            singerId: {
                _id: "66a7b19f902aec43843e17da",
                fullName: "Sơn Tùng",
                slug: "son-tung-ysV2Kjyy5c"
            },
            otherSingersId: []
        },
        {
            _id: "66a8559b923418ff968042a7",
            name: "Hồng Nhan",
            slug: "hong-nhan-WV9SjNTx57",
            avatar: "http://res.cloudinary.com/dfjft1zvv/image/upload/v1722307993/images/uzs7dvjeq2pilplchihl.jpg",
            singerId: {
                _id: "66a7b36ea5474ad07687bf99",
                fullName: "Jack",
                slug: "jack-3NxWwofiVc"
            },
            otherSingersId: [
                {
                    _id: "66a7b19f902aec43843e17da",
                    fullName: "Sơn Tùng",
                    slug: "son-tung-ysV2Kjyy5c"
                }
            ]
        },
        {
            _id: "66a851651c36eabb8d0c84c2",
            name: "Khuôn mặt đáng thương",
            slug: "khuon-mat-dang-thuong-7qwTsPsZ4a",
            avatar: "http://res.cloudinary.com/dfjft1zvv/image/upload/v1722306913/images/kiovfci3m1k5p6lufmto.jpg",
            singerId: {
                _id: "66a7b19f902aec43843e17da",
                fullName: "Sơn Tùng",
                slug: "son-tung-ysV2Kjyy5c"
            },
            otherSingersId: []
        },
        {
            _id: "66b9dd427b9711e0202eb794",
            name: "Mưa",
            slug: "mua-s0L2She4MC",
            avatar: "http://res.cloudinary.com/dfjft1zvv/image/upload/v1723456820/images/gqdyjxgfu08marrkje0c.jpg",
            singerId: {
                _id: "66b9db8f7b9711e0202eb78d",
                fullName: "Minh Vương M4U",
                slug: "minh-vuong-m4u-0C2nVbnb2L"
            },
            otherSingersId: [
                {
                    _id: "66b9dccb7b9711e0202eb790",
                    fullName: "Thùy Chi",
                    slug: "thuy-chi-bcxYPFmwT7"
                }
            ]
        },
        {
            _id: "66a853990f29a16bafdb780a",
            name: "Nắng ấm xa dần",
            slug: "nang-am-xa-dan-7wDAyJkzqv",
            avatar: "http://res.cloudinary.com/dfjft1zvv/image/upload/v1722307479/images/mmhhjiigu23chd8gccmn.jpg",
            singerId: {
                _id: "66a7b19f902aec43843e17da",
                fullName: "Sơn Tùng",
                slug: "son-tung-ysV2Kjyy5c"
            },
            otherSingersId: []
        },
        {
            _id: "66b9cf767b9711e0202eb762",
            name: "Nàng kiều lỡ bước",
            slug: "nang-kieu-lo-buoc-iy4Dse2oOj",
            avatar: "http://res.cloudinary.com/dfjft1zvv/image/upload/v1723453297/images/mbm4ssfleiclsopi83ho.jpg",
            singerId: {
                _id: "66a7b431a5474ad07687bf9c",
                fullName: "HKT",
                slug: "hkt-bp2dTN4QvR"
            },
            otherSingersId: []
        },
        {
            _id: "66b9ce047b9711e0202eb758",
            name: "Trú mưa",
            slug: "tru-mua-BFy6cJnxpc",
            avatar: "http://res.cloudinary.com/dfjft1zvv/image/upload/v1723452916/images/v2emq0fo0fe2fxpj0ahl.jpg",
            singerId: {
                _id: "66a7b431a5474ad07687bf9c",
                fullName: "HKT",
                slug: "hkt-bp2dTN4QvR"
            },
            otherSingersId: []
        }
    ]
    
    const arr = [
        "active active active",
        "last prev prev",
        "next next first"
    ];

    return (
        <>
            {contextHolder}
            <AlbumContextMenu messageApi={messageApi} user={user} onAlbumChange={() => setAlbumChange(!albumChange)}/>
            <EditAlbum messageApi={messageApi} album={album.data?.album} onAlbumChange={() => setAlbumChange(!albumChange)}/>
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
                <h4 className="mb-2 pl-3">Bài hát gợi ý</h4>
                <div className="d-flex" style={{flexWrap: "wrap"}}>
                    {initMusic.map((value, key) => (
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
        </>
    );
}