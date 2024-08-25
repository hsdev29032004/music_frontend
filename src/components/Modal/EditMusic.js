import { useEffect, useRef, useState } from 'react';
import './Modal.css';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalEditMusic } from '../../actions/modal';
import { useForm } from 'antd/es/form/Form';
import { editMusic, getLyrics, getOneMusic } from '../../services/music';
import { getAlbumsBySingerId, getListSinger } from '../../services/singer';

function CustomLabel({ messageApi, name, form }) {
    const [isCrawling, setIsCrawling] = useState(false);

    const crawlLyrics = async () => {
        if(name.current.input.value.trim() === ""){
            return messageApi.error("Chưa nhập tên bài hát")
        }
        setIsCrawling(true)
        const result = await getLyrics(name.current.input.value);
        
        if (result.status === "success") {
            form.setFieldsValue({ lyrics: result.data })
            messageApi.success(result.msg)
        } else if (result.status === "error") {
            messageApi.error(result.msg)
        }
        
        setIsCrawling(false)
    }

    return (
        <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "space-between"}}>
            <span>Lời bài hát</span>
            <div
                style={{ 
                    marginLeft: '8px', 
                    cursor: isCrawling ? "not-allowed" : "pointer", 
                    borderBottom: "1px solid white", 
                    opacity: isCrawling ? 0.5 : 1
                }}
                onClick={!isCrawling ? crawlLyrics : null}
            >
                Crawl lời bài hát
            </div>
        </div>
    )
}

export default function EditMusic({ messageApi }) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [file, setFile] = useState(null)
    const [mp3, setMp3] = useState(null)
    const [infoMusic, setInfoMusic] = useState({})
    const [singer, setSinger] = useState([])
    const [albums, setAlbums] = useState([])
    
    const name = useRef(null)

    const [form] = useForm()
    const dispatch = useDispatch()

    const music = useSelector(state => state.musicContextMenuReducer.data?.music)    
    
    useEffect(() => {
        const fetchMusic = async () => {
            const result = await getOneMusic(music.slug)            
            setInfoMusic(result.data)
        }
        fetchMusic()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const fetchSinger = async () => {
            const result = await getListSinger()  
            setSinger(result.data)
        }
        fetchSinger()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const fetchAlbums = async () => {
            const result = await getAlbumsBySingerId(music.singerId?.slug)            
            setAlbums(result.data)
        }
        fetchAlbums()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        return () => {
            if (file && typeof file === 'string') {
                URL.revokeObjectURL(file);
            }
        };
    }, [file]);

    useEffect(() => {
        if (infoMusic) {
            form.setFieldsValue({
                ...infoMusic,
                singerId: infoMusic.singerId?._id,
                otherSingersId: infoMusic.otherSingersId?.map(singer => singer._id)
            });
        }
        // eslint-disable-next-line
    }, [infoMusic]);

    const handleOk = async () => {
        setConfirmLoading(true);

        setTimeout(async () => {
            try {
                const values = await form.validateFields()
                const formData = new FormData();                

                for (const key in values) {
                    if (values.hasOwnProperty(key) && values[key]) {
                        formData.append(key, values[key]);
                    }
                }

                if (file) {
                    formData.append('avatar', file);
                }
                if(mp3) {
                    formData.append("urlMp3", mp3)
                }

                const result = await editMusic(music?._id, formData);
                if (result.status === "success") {
                    form.resetFields();
                    form.setFieldsValue({
                        name: result.data || infoMusic,
                    });
                    setFile(null)
                    // dispatch(reloadAlbum())
                    dispatch(closeModalEditMusic())
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
        dispatch(closeModalEditMusic())
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
        }
    };
    
    const handleMp3Change = (e) => {
        const file = e.target.files[0]
        if(file){
            setMp3(file)
        }
    }

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content" style={{ width: "1000px" }}>
                    <h2 className="modal-title">Chỉnh sửa bài hát</h2>
                    <div className='dflex-aj-center'>
                        <div className="avatar-container">
                            <img
                                src={file ? URL.createObjectURL(file) : music?.avatar || "https://res.cloudinary.com/dfjft1zvv/image/upload/v1722247373/orrqmjzdwcrwlmz5k9ti.jpg"}
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
                        <div className='mp3-container ml-3'>
                            <input 
                                type='file'
                                id='mp3-upload'
                                accept="audio/mpeg"
                                className='d-none'
                                onChange={handleMp3Change}
                            />
                            <audio 
                                controls 
                                src={mp3 ? URL.createObjectURL(mp3) : infoMusic.urlMp3}
                            />
                            <Button 
                                onClick={() => document.getElementById("mp3-upload").click()}
                                style={{display: "block", marginTop: "0px"}}
                            >
                                Tải lên mp3
                            </Button>
                        </div>
                    </div>
                    <Form
                        form={form}
                        className="modal-body"
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Row gutter={20}>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} span={24}>
                                <Form.Item
                                    label="Tên bài hát"
                                    name="name"
                                    rules={[{ required: true }]}
                                >
                                    <Input ref={name} className='input input-modal' />
                                </Form.Item>
                                <Form.Item
                                    label="Album"
                                    name="album"
                                >
                                    <Select
                                        className='select-bg'
                                        dropdownStyle={{ backgroundColor: "#454545" }}
                                    >
                                        {albums.map((a) => (
                                            <Select.Option key={a._id} value={a._id}>
                                                {a.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Ca sĩ"
                                    name="singerId"
                                >
                                    <Select
                                        className='select-bg'
                                        dropdownStyle={{ backgroundColor: "#454545" }}
                                        placeholder="Chọn ca sĩ"
                                        disabled
                                    >
                                        <Select.Option value={music.singerId?._id}>
                                            {music.singerId?.fullName}
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Ca sĩ góp mặt"
                                    name="otherSingersId"
                                >
                                    <Select
                                        className='select-bg'
                                        dropdownStyle={{ backgroundColor: "#454545" }}
                                        mode='multiple'
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().includes(input.toLowerCase())
                                        }
                                    >
                                        {singer.map((s) => (
                                            <Select.Option key={s._id} value={s._id}>
                                                {s.fullName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Phân loại"
                                    name="premium"
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        className='select-bg'
                                        dropdownStyle={{ backgroundColor: "#454545" }}
                                    >
                                        <Select.Option value={false}>
                                            Basic
                                        </Select.Option>
                                        <Select.Option value={true}>
                                            Premium
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} span={24}>
                                <Form.Item
                                    label={<CustomLabel name={name} messageApi={messageApi} form={form} />}
                                    name="lyrics"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input!',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={10} />
                                </Form.Item>
                                <Form.Item
                                    label="Mô tả"
                                    name="description"
                                >
                                    <Input.TextArea rows={6} />
                                </Form.Item>
                            </Col>
                        </Row>
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
