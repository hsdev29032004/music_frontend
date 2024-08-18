import { useEffect, useState } from 'react';
import './Modal.css';
import { Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalEditAlbum } from '../../actions/modal';
import { useForm } from 'antd/es/form/Form';
import { editAlbum } from '../../services/album';

export default function EditAlbum({ onAlbumChange, album, messageApi }) {    
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = useForm()
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)    
    
    const open = useSelector(state => state.modalReducer.isEditAlbumOpen)

    useEffect(() => {
        return () => {
            if (file && typeof file === 'string') {
                URL.revokeObjectURL(file);
            }            
        };
    }, [file]);

    
    useEffect(() => {
        if (open && album && form) {
            form.setFieldsValue({
                name: album.name,
                singerId: album.singerId._id
            });
        }
        // eslint-disable-next-line
    }, [open])

    const handleOk = async () => {
        setConfirmLoading(true);

        setTimeout(async () => {
            try {
                const values = await form.validateFields();
    
                const formData = new FormData();
                formData.append('name', values.name);
                if (file) {
                    formData.append('avatar', file);
                }            
    
                const result = await editAlbum(album?._id, formData);
                if (result.status === "success") {
                    form.resetFields();
                    form.setFieldsValue({
                        name: result.data.name || album?.name,
                    });
                    setFile(null)
                    onAlbumChange()
                    dispatch(closeModalEditAlbum())                    
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
        dispatch(closeModalEditAlbum())
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
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2 className="modal-title">Chỉnh sửa album</h2>
                    <div className='dflex-j-center'>
                        <div className="avatar-container">
                            <img
                                src={file ? URL.createObjectURL(file) : album?.avatar || "https://res.cloudinary.com/dfjft1zvv/image/upload/v1722247373/orrqmjzdwcrwlmz5k9ti.jpg"}
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
                            name: album?.name,
                            singerId: album?.singerId._id
                        }}
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
                                <Select.Option value={album?.singerId._id}>
                                    {album?.singerId.fullName}
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        {/* <Form.Item
                            label="Ca sĩ góp mặt"
                            name="otherSingersId"
                        >
                            <Select 
                                className='select-bg'
                                multiple
                                dropdownStyle={{backgroundColor: "#454545"}}
                            />
                        </Form.Item> */}
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
