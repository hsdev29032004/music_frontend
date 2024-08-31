import { Col, Form, Input, message, Row } from "antd";
import { login } from "../../../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Login({title}) {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    
    const onFinish = async (values) => {
        const res = await login(values)
        if(res.status === "error"){
            messageApi.error(res.msg)
        }else{
            navigate("/");
        }
    }

    return(
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {contextHolder}
            <div className="card">
                <h2 className="text-center text-white fw-700 mb-4">Đăng nhập</h2>
                <Form
                    name="auth_form"
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{email: "basic@gmail.com", password: "meelow"}}
                >
                    <Form.Item
                        name="email"
                        label={<span style={{ color: 'white' }}>Email</span>}
                        rules={[{ required: true, message: 'Chưa nhập email' }]}
                    >
                        <Input className="input" type="email" placeholder="admin@gmail.com" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={<span style={{ color: 'white' }}>Mật khẩu</span>}
                        rules={[{ required: true, message: 'Chưa nhập password' }]}
                        style={{marginBottom: "5px"}}
                    >
                        <Input className="input" type="password" placeholder="meelow" />
                    </Form.Item>
                    <p style={{textAlign: "end"}}>
                        <Link to="/forgot-password">
                            Quên mật khẩu?
                        </Link>
                    </p>
                    <Form.Item>
                        <button type="submit" className="btn-purple" style={{ width: "100%" }}>
                            Đăng nhập
                        </button>
                    </Form.Item>
                </Form>
                <p className="text-center" style={{fontWeight: 400, fontSize: "11px"}}>Hoặc đăng nhập với</p>
                <Row gutter={[20, 20]}>
                    <Col xs={8}>
                        <button className="btn-white" style={{width: "100%"}}>
                            <img width="30px" src="/images/icon-google.png" alt="Google Icon" />
                        </button>
                    </Col>
                    <Col xs={8}>
                        <button className="btn-white" style={{width: "100%"}}>
                            <img width="30px" src="/images/icon-facebook.png" alt="Google Icon" />
                        </button>
                    </Col>
                    <Col xs={8}>
                        <button className="btn-white" style={{width: "100%"}}>
                            <img width="30px" src="/images/icon-zalo.png" alt="Google Icon" />
                        </button>
                    </Col>
                </Row>
                <p className="text-center mt-3">Bạn chưa có tài khoản? <Link to="/register" className="fw-600">Đăng ký ngay</Link></p>
            </div>
        </>
    )
}