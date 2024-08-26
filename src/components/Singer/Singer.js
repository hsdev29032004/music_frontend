import { Link } from "react-router-dom"
import "./Singer.css"
import { handleReplaceWaitingList } from "../../helpers/playlist"
import { useDispatch } from "react-redux"
import { subcribeSinger } from "../../services/favorite"
import { useState } from "react"
import { formatNumber } from "../../helpers/format"

export default function Singer({value, messageApi, user}){    
    const dispatch = useDispatch()
    const [quantitySubcriber, setQuantitySubcriber] = useState(value.quantitySubcriber)
    const [isSubscribed, setIsSubscribed] = useState(user?.subcribedSinger.some(item => item._id === value._id))
    
    const handleSubcribe = async () => {
        const result = await subcribeSinger(value._id, user._id)
        if(result.status === "like"){
            setIsSubscribed(true)
            setQuantitySubcriber(prev => prev+1)
            messageApi.success(result.msg)
        }else if(result.status === "unlike"){
            setIsSubscribed(false)            
            setQuantitySubcriber(prev => prev-1)
            messageApi.success(result.msg)
        }else{
            messageApi.error(result.msg)
        }
    }
    
    return(
        <>
            <div className="inner-image">
                <img src={value.avatar} alt=""/>
                <div className="tippy">
                    <i onClick={() => handleReplaceWaitingList(value, dispatch, messageApi, "SINGER")} className="fa-solid fa-triangle border-white"></i>
                </div>
            </div>
            <div className="mt-2 text-center">
                <Link to={`/singer/${value.slug}`} className="ellipsis">
                    <h3 className="album-link">{value.fullName}</h3>
                </Link>
                <div style={{fontSize: "13px", color: "#717171", fontWeight: 600}}>{formatNumber(quantitySubcriber)} quan tâm</div>
            </div>
            <div onClick={handleSubcribe} className={`${isSubscribed ? "btn-white" : "btn-purple"} text-center d-inline mb-3 mt-2 pt-1 pb-1`} style={{fontSize: "13px", cursor: "pointer"}}>{isSubscribed ? "Bỏ quan tâm" : "Quan tâm"}</div>
        </>
    )
}