import { NavLink, Outlet } from "react-router-dom";
import "./Auth.css";
import { Col, Row } from "antd";

export default function Auth() {
    return (
        <>
            <div id="auth" className="bg-auth">
                <Row className="container d-flex-spacebetween">
                    <Col xxl={10} xl={10} lg={10} md={10} className="auth-left text-white">
                        <div>
                            <img className="auth-logo" src="https://res.cloudinary.com/dfjft1zvv/image/upload/v1722263453/lhuc6qqvcxzl0rxjlcdh.png" alt="logo"/>
                            <p className="text-description ml-2">
                                Là một nền tảng nghe nhạc trực tuyến tiên tiến, mang đến cho người dùng trải nghiệm nghe nhạc chất lượng cao và đa dạng.
                            </p>
                        </div>
                        <ul>
                            <li>Nghe nhạc miễn phí</li>
                            <li>Nâng cấp vĩnh viễn</li>
                            <li>Giao diện đẹp mắt</li>
                        </ul>
                        <NavLink to="/">
                            <button className="btn-purple">Nghe nhạc ngay</button>
                        </NavLink>
                    </Col>
                    <Col xxl={13} xl={13} lg={13} md={13} sm={24} xs={24}>
                        <Outlet />
                    </Col>
                </Row>
            </div>
        </>
    );
}
