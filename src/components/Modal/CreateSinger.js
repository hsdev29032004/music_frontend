import { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { createSinger } from '../../services/singer';

export default function CreateSinger({ messageApi, setOpenModalCreate }) {    
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = useForm()
    const [file, setFile] = useState(null)    
        
    useEffect(() => {
        return () => {
            if (file && typeof file === 'string') {
                URL.revokeObjectURL(file);
            }            
        };
    }, [file]);

    const handleOk = async () => {
        setConfirmLoading(true);

        setTimeout(async () => {
            try {
                let values
                try {
                    values = await form.validateFields();
                } catch (error) {
                    return messageApi.error("Chưa nhập đủ trường")
                }
                
    
                const formData = new FormData();
                formData.append('fullName', values.fullName);
                formData.append('description', values.description);

                if (file) {
                    formData.append('avatar', file);
                }                            
    
                const result = await createSinger(formData);

                if (result.status === "success") {
                    form.resetFields();
                    setFile(null)
                    setOpenModalCreate(false)              
                    messageApi.success(result.msg);                    
                } else {
                    messageApi.error(result.msg);
                }
            } catch (error) {
                messageApi.error(error);
            } finally {
                setConfirmLoading(false);
            }
        }, 1000);
    };

    const handleCancel = async () => {
        setFile(null);
        setOpenModalCreate(false)
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];        
        if (file) {
            setFile(file);
        }
    };
    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2 className="modal-title">Chỉnh sửa ca sĩ</h2>
                    <div className='dflex-j-center'>
                        <div className="avatar-container">
                            <img
                                src={file ? URL.createObjectURL(file) : "https://res.cloudinary.com/dfjft1zvv/image/upload/v1722247373/orrqmjzdwcrwlmz5k9ti.jpg"}
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
                    >
                        <Form.Item
                            label="Họ tên ca sĩ"
                            name="fullName"
                            rules={[{ required: true }]}
                        >
                            <Input className='input input-modal' />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                        >
                            <Input.TextArea rows={6} />
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
                            {confirmLoading ? 'Loading...' : 'Chỉnh sửa'}
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
