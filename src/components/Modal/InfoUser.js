import { Form, Input, message } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../services/user';
import { checkUser } from '../../actions/login';

export default function InfoUser({ open, setOpen }) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const dispatch = useDispatch()    

    const [messageApi, contextHolder] = message.useMessage();
    const user = useSelector(state => state.loginReducer);
    
    useEffect(() => {
        return () => {
            if (file && typeof file === 'string') {
                URL.revokeObjectURL(file);
            }            
        };
    }, [file]);

    const handleOk = async () => {
        setConfirmLoading(true);

        try {
            const values = await form.validateFields();

            const formData = new FormData();
            formData.append('fullName', values.fullName);
            if (file) {
                formData.append('avatar', file);
            }

            const result = await editUser(user.value._id, formData);            

            if (result.status === "success") {
                form.resetFields();
                messageApi.success(result.msg);
                form.setFieldsValue({
                    fullName: result.data.fullName || user.value.fullName,
                    email: result.data.email || user.value.email,
                    level: result.data.level || user.value.level,
                    createdAt: result.data.createdAt || user.value.createdAt,
                });
                setFile(null)
                dispatch(checkUser(result.data))
            } else {
                messageApi.error(result.msg);
            }
        } catch (error) {
            messageApi.error("Validation failed");
        } finally {
            setConfirmLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
        setFile(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    if (!open) return null;

    return (
        <>
            {contextHolder}
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className='dflex-j-center'>
                        <div className="avatar-container">
                            <img
                                src={file ? URL.createObjectURL(file) : user.value?.avatar || "https://res.cloudinary.com/dfjft1zvv/image/upload/v1722247373/orrqmjzdwcrwlmz5k9ti.jpg"}
                                alt="Avatar"
                                className="avatar-img"
                                onClick={() => document.getElementById('avatar-upload').click()}
                            />
                            <input
                                type="file"
                                id="avatar-upload"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <Form
                        form={form}
                        className="modal-body"
                        autoComplete="off"
                        layout="vertical"
                        initialValues={{ 
                            fullName: user.value?.fullName,
                            email: user.value?.email,
                            level: user.value?.level,
                            createdAt: user.value?.createdAt
                        }}
                    >
                        <Form.Item
                            label="Họ và tên"
                            name="fullName"
                            rules={[{ required: true, message: 'Họ và tên không được để trống!' }]}
                        >
                            <Input className='input input-modal' />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                        >
                            <Input className='input input-modal' disabled />
                        </Form.Item>
                        <Form.Item
                            label="Level"
                            name="level"
                        >
                            <Input className='input input-modal' disabled />
                        </Form.Item>
                        <Form.Item
                            label="Ngày tạo"
                            name="createdAt"
                        >
                            <Input className='input input-modal' disabled />
                        </Form.Item>
                    </Form>
                    <div className="modal-footer">
                        <button className="btn-close-modal" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button
                            className="btn-purple"
                            onClick={handleOk}
                            disabled={confirmLoading}
                        >
                            {confirmLoading ? 'Loading...' : 'Cập nhật'}
                        </button>
                    </div>
                    <span onClick={handleCancel} style={{ position: "absolute", top: "0px", right: "7px", cursor: "pointer" }}>
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                </div>
            </div>
        </>
    );
}
