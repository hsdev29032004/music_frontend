import { Form, Input, message } from "antd";
import { postOtp, postRequest, resetPassword } from "../../../services/forgotPassword";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { setCookie } from "../../../helpers/cookie"
import { Helmet } from "react-helmet-async";

export default function ForgotPassword({title}) {
    const [messageApi, contextHolder] = message.useMessage();
    const inputRef = useRef(null)
    const navigate = useNavigate()

    const onFinish = async (values) => {
        const resOtp = await postOtp({otp: values.otp})
        if(resOtp.status === "error"){
            messageApi.error(resOtp.msg)
        }else{
            const resReset = await resetPassword({
                password: values.password,
                repassword: values.repassword
            })
            if(resReset.status === "error"){
                messageApi.error(resReset.msg)
            }else{
                await messageApi.success(resReset.msg)
                navigate("/login")
            }
        }
    }

    const sendOtp = async () => {
        const email = inputRef.current.input.value
        const res = await postRequest({email: email})
        if(res.status === "error"){
            messageApi.error(res.msg)
        }else{
            messageApi.success(res.msg)
            setCookie("tokenReset", res.data, 1)
        }
    }
    return(
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {contextHolder}
            <div className="card">
                <h2 className="text-center text-white fw-700 mb-4">Quên mật khẩu</h2>
                <Form
                    name="auth_form"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="email"
                        label={<span style={{ color: 'white' }}>Email</span>}
                        rules={[{ required: true, message: 'Chưa nhập email' }]}
                        style={{marginBottom: "3px"}}
                    >
                        <div>
                            <Input ref={inputRef} className="input" type="email" placeholder="admin@gmail.com" />
                            <p style={{ margin: 0, marginTop: "5px", textAlign: "end", cursor: "pointer", color: "blue" }} className="text-link" onClick={sendOtp}>Gửi OTP</p>
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="otp"
                        label={<span style={{ color: 'white' }}>OTP</span>}
                        rules={[{ required: true, message: 'Chưa nhập OTP' }]}
                    >
                        <Input className="input" type="number" placeholder="Nhập OTP" />
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
                    <Form.Item style={{marginBottom: "0", marginTop: "30px"}}>
                        <button type="submit" className="btn-purple" style={{ width: "100%" }}>
                            Cập nhật mật khẩu
                        </button>
                    </Form.Item>
                </Form>
                <p className="text-center mt-1">Bạn nhớ mật khẩu rồi à? <Link to="/login" className="fw-600">Đăng nhập ngay</Link></p>
            </div>
        </>
    )
}