import { useEffect, useState } from "react";
import "./Discover.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { handleAddMusicToWaitingList } from "../../helpers/playlist";
import { useDispatch } from "react-redux";

export default function Discover({ title }) {
    const [currentIndex, setCurrentIndex] = useState(0); // Đặt giá trị ban đầu là 0
    const dispatch = useDispatch();

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

    const topMusic = [
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

    // Mảng trạng thái lớp CSS
    const arr = [
        "active active active",
        "last prev prev",
        "next next first"
    ];

    return (
        <>
            <div className="d-flex top-container">
                <LeftOutlined onClick={handlePrevious} />
                {/* <div className="inner-container"> */}
                    {topMusic.map((value, key) => (
                        <div
                            key={key}
                            className={`inner-image col-xl-4 col-lg-4 col-md-6 col-sm-12 ${arr[currentIndex % arr.length].split(' ')[key]}`}
                        >
                            <img onClick={() => handleAddMusicToWaitingList(value, dispatch)} src={value.avatar} alt="" />
                        </div>
                    ))}
                {/* </div> */}
                <RightOutlined onClick={handleNext} />
            </div>
        </>
    );
}


// col-xl-4 col-lg-4 col-md-6 col-sm-12