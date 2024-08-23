import { Link } from "react-router-dom"
import "./Singer.css"
import { handleReplaceWaitingList } from "../../helpers/playlist"
import { useDispatch } from "react-redux"

export default function Singer({value, messageApi}){
    const dispatch = useDispatch()
    return(
        <>
            <div className="inner-image">
                <img src={value.avatar} />
                <div className="tippy">
                    <i onClick={() => handleReplaceWaitingList(value, dispatch, messageApi, "SINGER")} className="fa-solid fa-triangle border-white"></i>
                </div>
            </div>
            <div className="mt-2 text-center">
                <Link to={`singer/${value.slug}`} className="ellipsis">
                    <h3 className="album-link">{value.fullName}</h3>
                </Link>
                <div style={{fontSize: "13px", color: "#717171", fontWeight: 600}}>{value.quantitySubcriber} quan tâm</div>
            </div>
        </>
    )
}