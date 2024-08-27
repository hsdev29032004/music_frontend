import { useEffect, useState } from 'react';
import './Modal.css';
import { Form, Input, Select } from 'antd';
import { useDispatch, } from 'react-redux';
import { closeModalCreateAlbum } from '../../actions/modal';
import { useForm } from 'antd/es/form/Form';
import { createAlbum } from '../../services/album';
import { reloadAlbum } from '../../actions/reload';

export default function CreateAlbum({ messageApi, singer: singerProp }) {    
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = useForm()
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)    
    
    useEffect(() => {        
        form.setFieldsValue({
            singerId: singerProp?._id
        });
        // eslint-disable-next-line
    }, [])

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
                formData.append('name', values.name);
                formData.append('singerId', values.singerId);
                if (file) {
                    formData.append('avatar', file);
                }else{
                    return messageApi.error("Chưa tải hình ảnh")
                }
    
                const result = await createAlbum(formData);
                if (result.status === "success") {
                    form.resetFields();
                    setFile(null)
                    dispatch(reloadAlbum())
                    dispatch(closeModalCreateAlbum())                    
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
        dispatch(closeModalCreateAlbum())
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
                    <h2 className="modal-title">Tạo mới album</h2>
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
                            label="Album"
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input className='input input-modal' />
                        </Form.Item>
                        <Form.Item
                            label="Ca sĩ"
                            name="singerId"
                        >
                            <Select 
                                className='select-bg'
                                dropdownStyle={{backgroundColor: "#454545"}}
                                disabled
                            >
                                <Select.Option value={singerProp?._id}>
                                    {singerProp?.fullName}
                                </Select.Option>
                            </Select>
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
                            {confirmLoading ? 'Loading...' : 'Tạo mới'}
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
