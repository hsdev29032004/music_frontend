import { Col, Row } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../../services/auth"

export default function Header() {
    const [openMenuUser, setOpenMenuUser] = useState(false)

    const navigate = useNavigate()

    const { value } = useSelector(state => state.loginReducer)

    const handleLogout = async () => {
        const result = await logout()
        if(result.status === "success"){
            navigate("/login")
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
            <div id="header">
                <Row className="inner-header">
                    <Col xxl={9} xl={9} lg={9} md={9} sm={9} xs={9}>
                        <input className="input-bora" placeholder="Tìm kiếm bài hát, ca sĩ, lời bài hát, ..." />
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
                                        <img style={{ width: "60px" }} src={value?.avatar} alt="" />
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
                                            <li className="text-gray dflex-a-center">
                                                <i className="fa-solid fa-user"></i>
                                                <p className="ml-2">Thông tin cá nhân </p>
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