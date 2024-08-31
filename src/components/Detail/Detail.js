import { Link } from "react-router-dom";
import "./Detail.css"
import { useEffect, useRef, useState } from "react";
import { likeAlbum, likeMusic } from "../../services/favorite";
import { handleReplaceWaitingList } from "../../helpers/playlist";
import { useDispatch } from "react-redux";

export default function Detail({data, user, messageApi, type}){
    const [quantityLike, setQuantityLike] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    
    const dispatch = useDispatch()

    useEffect(() => {
        switch (type) {
            case "MUSIC":
                setIsLiked(user?.likedMusic.some(item => item._id === data?._id))
                setQuantityLike(data?.quantityLike)
                break;
            case "ALBUM":
                setIsLiked(user?.likedAlbum.some(item => item._id === data?._id))
                setQuantityLike(data?.quantityLike)
                break;
            default:
                break;
        }
        // eslint-disable-next-line
    }, [data])

    const heartRef = useRef(null)

    const handleLike = async (e) => {
        e.stopPropagation()
        let result
        switch (type) {
            case "MUSIC":
                result = await likeMusic(data?._id, user?._id)
                break;
            case "ALBUM":
                result = await likeAlbum(data?._id, user?._id)
                break;
            default:
                break;
        }
        
        if (result.status === "like") {
            heartRef.current?.classList.add("liked");
            setIsLiked(true)
            setQuantityLike(prev => prev + 1)
        } else if (result.status === "unlike") {
            heartRef.current?.classList.remove("liked");
            setIsLiked(false)
            setQuantityLike(prev => prev - 1)
        }
    }
    
    return(
        <>
            <div className="detail-container row" style={{position: "sticky", top: 0, left: 0}}>
                <div className="col-xl-12 col-lg-12 col-md-4 col-sm-4 col-12 mb-3">
                    <div className="inner-image">
                        <img src={data?.avatar} alt="" />
                    </div>
                </div>
                <div className="content col-xl-12 col-lg-12 col-md-8 col-sm-8 col-12">
                    <h3 className="ellipsis" style={{fontSize: "1rem", marginBottom: ".2rem"}}>{data?.name}</h3>
                    <Link to={`/singer/${data?.singerId?.slug}`} className="singer-link">{data?.singerId?.fullName}</Link>
                    <span style={{color: "#717171", fontSize: "13px", fontWeight: "600"}}>{data?.createdAt && ` - ` + (new Date(data?.createdAt)).getFullYear()}</span>
                    {type !== "PLAYLIST" && 
                        <p style={{color: "#717171", fontSize: "13px", fontWeight: "600", marginBottom: ".5rem"}}>
                            {quantityLike} người yêu thích
                            <i ref={heartRef} onClick={handleLike} className={`fa-duotone fa-solid fa-heart ml-1 cursor-pointer ${isLiked ? 'liked' : ''}`}></i>
                        </p>
                    }
                    <button onClick={() => handleReplaceWaitingList(data, dispatch, messageApi, type)} className="btn-purple pt-1 pb-1">Phát</button>
                </div>
            </div>
        </>
    )
}