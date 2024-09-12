import { Helmet } from "react-helmet-async"
import { Form, Input, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "antd/es/form/Form"
import { useState } from "react";
import { editSystem } from "../../services/system";
import { systemInfo } from "../../actions/system";

export default function Config({ title }) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage()
    const [form] = useForm()
    const dispatch = useDispatch()

    const system = useSelector(state => state.systemInfoReducer)

    const handleOk = async () => {
        setConfirmLoading(true);

        setTimeout(async () => {
            try {
                const values = await form.validateFields()
                const result = await editSystem(values)
                dispatch(systemInfo(result.data))
                messageApi.success("Cập nhật thành công")
            } catch (error) {
                messageApi.error(error.message)
            } finally {
                setConfirmLoading(false);
            }
        }, 500)
    }

    return (
        <>
            {contextHolder}
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="modal-content" style={{width: "100%", backgroundColor: "#272727"}}>
                <h2 className="modal-title">Chỉnh sửa hệ thống</h2>
                <Form
                    form={form}
                    className="modal-body"
                    autoComplete="off"
                    layout="vertical"
                    initialValues={{
                        siteName: system?.siteName,
                        upgradePrice: system?.upgradePrice,
                        momo: system?.momo,
                        footer: system?.footer
                    }}
                >
                    <Form.Item
                        label="Tên website"
                        name="siteName"
                        rules={[{ required: true }]}
                    >
                        <Input className='input input-modal' />
                    </Form.Item>
                    <Form.Item
                        label="Giá nâng cấp premium"
                        name="upgradePrice"
                        rules={[{ required: true }]}
                    >
                        <Input type="number" className="input input-modal"/>
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="momo"
                        rules={[{ required: true }]}
                    >
                        <Input type="number" className="input input-modal"/>
                    </Form.Item>
                    <Form.Item
                        label="Footer"
                        name="footer"
                        rules={[{ required: true }]}
                    >
                        <Input className="input input-modal"/>
                    </Form.Item>
                </Form>
                <div className="modal-footer">
                    <button className="btn-close-modal" 
                        onClick={() => form.resetFields()}
                    >
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
            </div>
        </>
    )
}