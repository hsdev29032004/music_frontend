import { Col, Row } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { logout } from "../../services/auth"
import ChangePassword from "../../components/Modal/ChangePassword"
import InfoUser from "../../components/Modal/InfoUser"

export default function Header() {
    const [openMenuUser, setOpenMenuUser] = useState(false)
    const [openModalChangePassword, setOpenModalChangePassword] = useState(false)
    const [openModalInfoUser, setOpenInfoUser] = useState(false)

    const location = useLocation();
    const navigate = useNavigate()

    const { value } = useSelector(state => state.loginReducer)

    useEffect(() => {
        const inputSearch = document.querySelector("#input-search")
        inputSearch.value = ""
    }, [location]);

    const handleLogout = async () => {
        const result = await logout()
        if (result.status === "success") {
            navigate("/login")
        }
    }

    const handleSearch = async (e) => {      
        if(e.key === "Enter" && e.target.value.trim() !== ""){
            const keyword = e.target.value
            e.target.value = ""
            navigate(`search?keyword=${keyword}`)
        }
    }

    let level = [
        {
            name: "GUEST",
            style: {
                backgroundColor: "#a1a1a1"
            }
        },
        {
            name: "BASIC",
            style: {
                backgroundColor: "#a1a1a1"
            }
        },
        {
            name: "PREMIUM",
            style: {
                backgroundColor: "#dca519"
            }
        },
        {
            name: "ADMIN",
            style: {
                backgroundColor: "#8b45ca"
            }
        }
    ]

    return (
        <>
            <ChangePassword open={openModalChangePassword} setOpen={setOpenModalChangePassword} />
            <InfoUser open={openModalInfoUser} setOpen={setOpenInfoUser}/>
            <div id="header">
                <Row className="inner-header">
                    <Col xxl={9} xl={9} lg={9} md={9} sm={9} xs={9}>
                        <input 
                            id="input-search"
                            onKeyDown={(e) => handleSearch(e)} 
                            className="input-bora" 
                            placeholder="Tìm kiếm bài hát, ca sĩ, lời bài hát, ..." 
                        />
                    </Col>
                    <Col xxl={15} xl={15} lg={15} md={15} sm={15} xs={15} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        {value?.level === 1 && (
                            <p className="btn-purple">Nâng cấp tài khoản</p>
                        )}
                        <div className="inner-avatar ml-2">
                            <img onClick={() => value?.level !== 0 ? setOpenMenuUser(!openMenuUser) : navigate("/login")} src={value?.avatar || "https://res.cloudinary.com/dfjft1zvv/image/upload/v1722247373/orrqmjzdwcrwlmz5k9ti.jpg"} alt="avt" />
                            {openMenuUser ? (
                                <div className="menu-user">
                                    <div className="dflex-a-center">
                                        <div className="inner-avatar" style={{ width: "60px", height: "60px" }}>
                                            <img src={value?.avatar} alt="" />
                                        </div>
                                        <div className="ml-2">
                                            <h5 style={{ fontWeight: "700" }}>{value?.fullName}</h5>
                                            <span className="tag-level" style={level[value?.level]?.style}>{level[value?.level]?.name}</span>
                                        </div>
                                    </div>
                                    {value?.level === 1 ? (
                                        <div className="card-header-upgrade">
                                            <h4>Meelow PREMIUM</h4>
                                            <p className="mt-1 mb-1 fw-700">Chỉ với 30.000đ/Tháng</p>
                                            <p className="mb-2 fw-400">Nghe toàn bộ kho nhạc premium chất lượng cao</p>
                                            <button className="btn-purple pt-1 pb-1">Nâng cấp ngay</button>
                                        </div>
                                    ) : null}
                                    <div className="list-hover">
                                        <ul>
                                            <li onClick={() => setOpenInfoUser(true)} className="text-gray dflex-a-center">
                                                <i className="fa-solid fa-user"></i>
                                                <p className="ml-2">Thông tin cá nhân </p>
                                            </li>
                                            <li onClick={() => setOpenModalChangePassword(true)} className="text-gray dflex-a-center">
                                                <i className="fa-solid fa-lock"></i>
                                                <p className="ml-2">Đổi mật khẩu</p>
                                            </li>
                                            <li onClick={handleLogout} className="text-gray dflex-a-center">
                                                <i className="fa-solid fa-right-from-bracket"></i>
                                                <p className="ml-2">Đăng xuất</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}