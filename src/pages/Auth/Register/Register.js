import { Form, Input, message } from "antd";
import { register } from "../../../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Register({title}) {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()

    const onFinish = async (values) => {
        const res = await register(values)
        if(res.status === "error"){
            messageApi.error(res.msg)
        }else{
            await messageApi.success(res.msg, 1)
            navigate("/")
        }
    }

    return(
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {contextHolder}
            <div className="card">
                <h2 className="text-center text-white fw-700 mb-4">Đăng ký</h2>
                <Form
                    name="auth_form"
                    onFinish={onFinish}
                    layout="vertical"
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
                    >
                        <Input className="input" type="password" placeholder="Nhập password" />
                    </Form.Item>
                    <Form.Item
                        name="repassword"
                        label={<span style={{ color: 'white' }}>Nhập lại mật khẩu</span>}
                        rules={[{ required: true, message: 'Chưa nhập lại password' }]}
                    >
                        <Input className="input" type="password" placeholder="Nhập lại password" />
                    </Form.Item>
                    <Form.Item
                        name="fullName"
                        label={<span style={{ color: 'white' }}>Họ tên</span>}
                        rules={[{ required: true, message: 'Chưa nhập họ tên' }]}
                    >
                        <Input className="input" type="text" placeholder="Đỗ Phúc Hưng" />
                    </Form.Item>
                    <Form.Item style={{marginBottom: "0", marginTop: "30px"}}>
                        <button type="submit" className="btn-purple" style={{ width: "100%" }}>
                            Đăng ký
                        </button>
                    </Form.Item>
                </Form>
                <p className="text-center mt-1">Bạn đã có tài khoản? <Link to="/login" className="fw-600">Đăng nhập ngay</Link></p>
            </div>
        </>
    )
}