import { useEffect, useState } from "react"
import { getInfo } from "../../services/system"
import PieChart from "../../components/Charts/PieChart"
import LineChart from "../../components/Charts/LineChart"
import { getListComment } from "../../services/comment"
import CommentTable from "../../components/Comment/Comment"
import CreateSinger from "../../components/Modal/CreateSinger"
import { message } from "antd"

export default function Dashboard ({title}){
    const [info, setInfo] = useState({})
    const [comment, setComment] = useState([])
    const [openModalCreate, setOpenModalCreate] = useState(false)

    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        document.title = title
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const fetchInfo = async () => {
            const result = await getInfo()
            setInfo(result.data)
        }

        fetchInfo()
    }, [])

    useEffect(() => {
        const fetchComment = async () => {
            const result = await getListComment()            
            setComment(result.data)
        }

        fetchComment()
    }, [])

    return(
        <>
            {contextHolder}
            {openModalCreate ? <CreateSinger messageApi={messageApi} setOpenModalCreate={setOpenModalCreate} /> : null}
            <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div style={{backgroundColor: "#292929", borderRadius: "10px", padding: "10px", marginTop: "10px"}}>
                        <h3 style={{fontSize: "25px", color: "white", textAlign: "center"}}>Người dùng</h3>
                        <PieChart data={info.quantityUser}/>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div style={{backgroundColor: "#292929", borderRadius: "10px", padding: "10px", marginTop: "10px"}}>
                        <h3 style={{fontSize: "25px", color: "white", textAlign: "center"}}>Bài hát</h3>
                        <PieChart data={info.quantityMusic}/>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-6 col-12">
                    <div className="col-12" style={{backgroundColor: "#292929", borderRadius: "10px", padding: "10px", marginTop: "10px"}}>
                        <div>
                            <h3 className="dflex-aj-center" style={{fontSize: "25px", color: "white"}}>
                                Ca sĩ {info.quantitySinger}
                                <i 
                                    onClick={() => setOpenModalCreate(true)}
                                    className="fa-sharp fa-solid fa-plus ml-2 dflex-a-center" 
                                    style={{fontSize: "11px", padding: "3px 5px", borderRadius: "50%", cursor: "pointer", backgroundColor: "#984bdc"}}
                                >
                                </i>
                            </h3>
                        </div>
                    </div>
                    <div className="col-12" style={{backgroundColor: "#292929", borderRadius: "10px", padding: "10px", marginTop: "10px"}}>
                        <h3 style={{fontSize: "25px", color: "white", textAlign: "center"}}>Album {info.quantityAlbum}</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-12 mt-3">
                    <div style={{backgroundColor: "#292929", borderRadius: "10px", padding: "10px"}}>
                        <h3 style={{fontSize: "25px", color: "white", textAlign: "center"}}>Doanh thu</h3>
                        <LineChart/>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-12 mt-3">
                    <div style={{backgroundColor: "#292929", borderRadius: "10px", padding: "10px", height: "100%"}}>
                        <h3 style={{fontSize: "25px", color: "white", textAlign: "center"}}>Quản lý bình luận</h3>
                        <div style={{height: "400px", overflow: "auto"}}>
                            <CommentTable comment={comment} messageApi={messageApi} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}