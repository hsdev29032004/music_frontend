import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Empty, Typography } from 'antd';
import { Link } from "react-router-dom"

export default function Library({ title }) {
    useEffect(() => {
        document.title = title
        // eslint-disable-next-line
    }, [])
    const user = useSelector(state => state.loginReducer)
    console.log(user.value);

    if (user.value?.level === 0) {
        return (
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 60 }}
                description={
                    <Typography.Text style={{color: "white"}}>
                       Bạn chưa <Link to="/login">đăng nhập</Link>
                    </Typography.Text>
                }
            >
            </Empty>
        )
    }

    return (
        <>
            Library
        </>
    )
}